import dnaModel from "../models/dnaModel";

/**
 * Función evalua si una secuencia de ADN es de un mutante
 * Por regla si encuentra más de una secuencia de cuatro letras iguales
 * @param service url del servicio
 */
export async function IsMutant(dnaArray: Array<string>) {
    let dna=new dnaModel(dnaArray);
    let isMutant=await dna.IsMutant();
    return isMutant;
}


export async function IsValid(dnaArray: Array<string>) {
    let dna=new dnaModel(dnaArray);
    let isValid= await dna.IsValid();    
    return isValid;
}