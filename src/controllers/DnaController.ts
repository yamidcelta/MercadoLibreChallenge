import { IsMutant,IsValid } from "../services/DnaService";
/**
 * Clase controladora, encargada de validar si una secuencia de adn pertenece a un mutante
 * @category Controllers
 */
 export default class DnaController {
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
    public async IsMutant(dna: Array<string>) {
        return IsMutant(dna);
    }

     /**
     * Método que raliza la validación que la secuencia de adn esté correctameten formateada
     * 
     * @param dna secuencia de ADN
     */
         public async IsValid(dna: Array<string>) {
            return IsValid(dna);
        }

}