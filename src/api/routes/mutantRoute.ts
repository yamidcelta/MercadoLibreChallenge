import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typescript-ioc';
import MutantController from '../../controllers/DnaController';
import RedisController from '../../controllers/RedisController';
import SQLController from '../../controllers/SQLController';
import LoggerInstance from '../../loaders/loggerLoader';

//Routing general de las funcionalidades de validar mutante

export default (app: Router) => {

    app.post(
        '/stats',
        statsMiddelware
        )

    app.get(
        '/stats',
        statsMiddelware)

    app.post(
        '/mutant',
        validatorMiddelware,
        cacheMiddelware,
        isMutantMiddelware
        );

        
        async function statsMiddelware (req: Request, res: Response, next: NextFunction) {
            let sqlController: SQLController= Container.get(SQLController);
            let stats= await sqlController.Stats();
            res.status(200).send(stats);
        }
        
        async function validatorMiddelware (req: Request, res: Response, next: NextFunction) {
            try {
                let dna=req.body.dna;
                let mutantController: MutantController = Container.get(MutantController);
                let isValid=await mutantController.IsValid(dna);
                if(!isValid){
                    res.status(403).send("Secuencia inválida");
                    return;
                }
                else
                    next();
            }catch(err) {
                res.status(403).send({error:err.message});
            }

        }
        //IsMutant Algorithm
        async function isMutantMiddelware (req: Request, res: Response, next: NextFunction) {
            try {
                let dna=req.body.dna;                
                let mutantController: MutantController = Container.get(MutantController);
                let sqlController: SQLController= Container.get(SQLController);
                let isMutant = await mutantController.IsMutant(dna);
                sqlController.InsertarDNA(dna,isMutant)
                if (isMutant)
                {                    
                    res.status(200).send();
                }
                else
                    res.status(403).send({res:'No es mutante'});

            } catch(err) {
                res.status(403).send(err.message);
            }
        }

     // Cache middleware
    async function cacheMiddelware(req: Request, res: Response, next: NextFunction) {
        let dna=req.body.dna;
        if(dna.length<15)
        {
                next();
                return;                       
        }

        //Redis caché check
        LoggerInstance.debug('mutantRoute ingreso a cache '+ dna + req.body);
        let redisController:RedisController = Container.get(RedisController); 
        console.time("Redis");
        let data= null; //await redisController.GetDnaCachedResults(dna);        
        console.timeEnd("Redis");
        LoggerInstance.debug('mutantRoute '+ dna+ ' data '+data);

        //Redis caché found
        if(data!=null){
            res.status(200).json({
                data: data,
                });
                return;
        }
        else
        {
            //Check SQL DB     
            let sqlController: SQLController= Container.get(SQLController);
            console.time("Sql");
            let dataInDB = await sqlController.ReadDNA(dna);
            console.timeEnd("Sql");

            if(dataInDB==true){
                // redisController.Set(dna,dataInDB);
                res.status(200).json({
                    data: dataInDB,
                    });
                    return;
            } else if(dataInDB==false){
                redisController.Set(dna,dataInDB);
                res.status(403).json({
                    data: dataInDB,
                    });
                    return;
            } 
            else
            {
                LoggerInstance.debug('mutantRoute Next middleware');            
                next();
            }
        }
    }
}