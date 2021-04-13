import config from '../config';
import redis from 'redis';
import { promisifyAll } from 'bluebird';
import crypto from 'crypto';
/**
 * Función evalua si una secuencia de ADN es de un mutante
 * Por regla si encuentra más de una secuencia de cuatro letras iguales
 * @param service url del servicio
 */

promisifyAll(redis);

const client = redis.createClient({
    port: 6379,
    host: config.cache.host
});


export async function GetDna(dna:Array<string>) {
    let dnaString=dna.join('');
    var hash = crypto.createHash('sha1').update(dnaString).digest('base64');
    const res = await Get(hash);
    return res;
}

export async function SetDna(dna:Array<string>,value:boolean) {
    let dnaString=dna.join('');
    var hash = crypto.createHash('sha1').update(dnaString).digest('base64');
    const res = Set(hash,value.toString());
    return res;
}

export async function Get(key:string) {
    
    const res = await client.getAsync(key);
    return res;
    // return false;

}

export function Set(key:string, value:string) {    
    client.set(key, value);
    // return;
}

