import { GetDna,SetDna } from "../services/RedisService";
/**
 * Clase controladora, encargada de validar si una secuencia de adn pertenece a un mutante
 * @category Controllers
 */
 export default class RedisController {
    /**
     * constructor de clase
     */
    constructor(
    ) {}

    /**
     * Método que revisa la existencia de una llave en caché
     * 
     * @param key llave de caché
     */
    public async GetDnaCachedResults(key:Array<string>) {         
        return await GetDna(key);
    }

    public Set(key:Array<string>, value:boolean) {
        return SetDna(key,value);
    }
}