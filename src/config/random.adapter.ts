import crypto from 'crypto';


export class GenerateNumberRand {

    static getNumber = () => {

        const buffer = crypto.randomBytes(3);
  
        const numeroHexadecimal = buffer.toString('hex').slice(0, 5);;
        
        const numeroDecimal = parseInt(numeroHexadecimal, 16);

        const numeroFinal = Math.min(numeroDecimal, 99999);
        
        return numeroFinal;
    }

}