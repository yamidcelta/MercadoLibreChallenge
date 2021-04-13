import crypto from 'crypto';
import config from '../config';
/**
 * Modelo de DNA
 * @category Models
 */
 export default class dnaModel {
     //Hash de la sequencia de ADN
    private _hash!: string;
     public get hash(): string {
         return this._hash;
     }
     public set hash(value: string) {
         this._hash = value;
     }

     //Propiedad array de string con la sequencia de DNA
    private _sequence: Array<string> = [];
     public get sequence(): Array<string> {
         return this._sequence;
     }
     public set sequence(value: Array<string>) {
         this._sequence = value;
     }
     
    //Cantidad mínima de secuencias para calificar como mutante
    readonly MinSequences:number=config.dnaConfig.minsequences;
    //Longitud mínima de secuencia
    readonly SequenceLength:number=config.dnaConfig.sequencelength;
    //Caracteres de secuencia
    readonly SequenceChars:string[]=config.dnaConfig.sequencechars;

     //Constructor de la clase DNA
    constructor(_sequence: Array<string>) {
        this.sequence=_sequence;
        let dnaString=this.ToString();
        this.hash = crypto.createHash('sha1').update(dnaString).digest('base64');
    }

    public ToString()
    {
        return this.sequence.join('');
    }

    public ToMatrix(dnaArray:Array<string>)
    {
        let dnaMatrix : string[][]=[];
        for (var i = 0; i < dnaArray.length; i++)
            dnaMatrix[i] = new Array(dnaArray.length);
        
        dnaArray.forEach((dna, x) => {
            dna.split('').forEach((char, y) => {
                dnaMatrix[x][y] = char;
            })
        });
        return dnaMatrix;
    }

        
    async checkVertical(indexY: number, indexX: number, charToCheck: any, dnaArray: string [][]) {
        
        if (dnaArray.length < this.SequenceLength+indexY) 
            return false;
        
        let result = true;
        for (var x = 1; x < this.SequenceLength; x++) 
            if (dnaArray[indexY + x][indexX] !== charToCheck) 
                return false;
                
        //console.log('V',charToCheck,indexY,indexX);
        return true;
    }

    async checkHorizontal(indexY: number, indexX: number, charToCheck: any, dnaArray: string [][]) {
        
        if (dnaArray.length < this.SequenceLength+indexX) 
        {
            return false;
        }
        
        for (var x = 1; x < this.SequenceLength; x++) 
            if (dnaArray[indexY][indexX + x] !== charToCheck) 
                return false;			

        //console.log('H',charToCheck,indexY,indexX);
        return true;
        
    }

    async checkObliqueToRight(indexY: number, indexX: number, charToCheck: string, dnaArray: string [][]) {
        
        if ((dnaArray.length < this.SequenceLength+indexX) || (dnaArray.length < this.SequenceLength+indexY)) 
            return false;
        
        for (var x = 1; x < this.SequenceLength; x++) 
            if (dnaArray[indexY + x][indexX + x] !== charToCheck) 
                return false;    
        
        //console.log('DR',charToCheck,indexY,indexX);
        return true;
    }

    async checkObliqueToLeft(indexY: number, indexX: number, charToCheck: any, dnaArray: string [][]) {
        
        if ((indexX<this.SequenceLength-1) || (dnaArray.length < this.SequenceLength+indexY)) 
            return false;
        
        let result = true;
        for (var x = 1; x < this.SequenceLength; x++)
            if (dnaArray[indexY + x][indexX - x] !== charToCheck)
                return false;
        
        //console.log('DL',charToCheck,indexY,indexX);
        return true;
    }

    //
    public async IsMutant(){
        let dnaArray = this.ToMatrix(this._sequence);
        let sequencesFound = 0;
        console.time("isMutant");
        for (var y = 0; y < dnaArray[0].length; y++) {
            for (var x = 0; x < dnaArray.length; x++) {
            let charToCheck = dnaArray[y][x];
            const chkV=this.checkVertical(y, x, charToCheck, dnaArray);
            const chkH=this.checkHorizontal(y, x, charToCheck, dnaArray);
            const chkOR=this.checkObliqueToRight(y, x, charToCheck, dnaArray);
            const chkOL=this.checkObliqueToLeft(y, x, charToCheck, dnaArray);

            
            if (await chkV)
                sequencesFound++;
            if (await chkH)
                sequencesFound++;
            if (await chkOR)
                sequencesFound++;
            if (await chkOL)
                sequencesFound++;	
			//console.log(y,x);			
            if (sequencesFound >= this.MinSequences)
                break;
        }
        if (sequencesFound >= this.MinSequences)
            break;
    }
    console.timeEnd("isMutant");
    //console.log(sequencesFound);
	return (sequencesFound >= this.MinSequences);
    }

    
    public async IsValid(){

        let chars=this.SequenceChars.join('');
        var onlyAllowedChars = new RegExp("^["+chars+"]+$").test(this.ToString());
        //console.log("onlyAllowedChars ",onlyAllowedChars)
        if (!onlyAllowedChars)
            {
                throw new Error(
                    'Se encontraron caracteres diferentes a los permitidos {ATGC}'
                  );
            }

        let dim=this._sequence.length;
        

        for (let element of this._sequence) {
            if(element.length!=dim){
                throw new Error(
                    'La secuencia presenta una longitud incorrecta en uno o más elementos'
                );
            }
          }

        return true;
    }
}