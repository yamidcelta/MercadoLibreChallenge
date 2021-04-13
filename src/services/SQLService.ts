const sql = require('mssql');
import crypto from 'crypto';
import LoggerInstance from '../loaders/loggerLoader';
import config from '../config';
/**
 * Función evalua si una secuencia de ADN es de un mutante
 * Por regla si encuentra más de una secuencia de cuatro letras iguales
 * @param service url del servicio
 */

export async function InsertDNA(dna: Array<string>,isMutant:boolean) {
    
    LoggerInstance.debug('sqlService dna , isM', dna, isMutant);
    let dnaString=dna.join('');
    var ha = crypto.createHash('sha1').update(dnaString).digest('base64');
    LoggerInstance.debug('sqlService dnaString , ha', dnaString, ha);
        sql.connect(config.database).then((pool: { request: () => { (): any; new(): any; input:
             { (arg0: string, arg1: any, arg2: any): { (): any; new(): any; input:
                 { (arg0: string, arg1: any, arg2: any): { (): any; new(): any; input: 
                    { (arg0: string, arg1: any, arg2: number): { (): any; new(): any; execute: 
                        { (arg0: string): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) => {

        // Stored procedure
        return pool.request()
            .input('hash', sql.NVarChar(40), ha)
            .input('dna', sql.NVarChar(10000), dnaString)
            .input('isMutant', sql.Bit, isMutant?1:0)
            .execute('InsertMutant')
    }).then((result: any) => {
        sql.close();
        console.dir(result)
    }).catch((err: any) => {        
        sql.close();
        console.dir(err)
    })
}

export async function Stats() {
    let outputs;
    LoggerInstance.debug('STATS!...');    
     await sql.connect(config.database).then(async (pool: { request: () => { (): any; new(): any; output: {
             (arg0: string, arg1: any): { (): any; new(): any; output: { (arg0: string, arg1: any): {
                  (): any; new(): any; output: { (arg0: string, arg1: any): {
                       (): any; new(): any; execute: { (arg0: string): any; new(): any; }; 
                            }; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) => {

        // Stored procedure
        return await pool.request()
            .output('count_human_dna', sql.BigInt)
            .output('count_mutant_dna', sql.BigInt)
            .output('ratio', sql.Float)
            .execute('GetStats')
    }).then((result: any) => {
        sql.close();
        console.dir(result)
        outputs = result.output;
    }).catch((err: any) => {        
        sql.close();
        console.dir(err)
    })

    return outputs;
}

export async function ReadDNA(dna: Array<string>) {
    let dnaString=dna.join('');
    var hash = crypto.createHash('sha1').update(dnaString).digest('base64');

    let response=await new sql.ConnectionPool(config.database).connect().then((pool: 
        { request: () => { (): any; new(): any; query: 
            { (arg0: string): any; new(): any; }; }; }) => {

        return pool.request().query(`select isMutant from mutant with(nolock) where hash = '${hash}'`);
      
        }).then((result: { recordset: any; }) => {
            
          sql.close();
          let rows = result.recordset;
          
          if(rows.length>0)
          {
            return rows[0].isMutant;
          } 
          else
            return null;
      
        }).catch((err: any) => {      
          sql.close(); 
          return null;     
    });
    return response;
}