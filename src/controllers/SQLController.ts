import {InsertDNA,ReadDNA,Stats } from '../services/SQLService';
/**
 * Clase controladora, encargada de validar si una secuencia de adn pertenece a un mutante
 * @category Controllers
 */
 export default class SQLController {
    /**
     * constructor de clase
     */
    constructor(
    ) {}

    /**
     * Método que valida que la secuencia de adn pertenece a un mutante
     * 
     * @param dna secuencia de ADN
     */
    public async InsertarDNA(dna: Array<string>, isMutant:boolean) {
        return InsertDNA(dna,isMutant);
    }

    public async ReadDNA(dna: Array<string>) {
        let a= await ReadDNA(dna);
        return a;
    }

    public async Stats() {
        let a= await Stats();
        return a;
    }
}