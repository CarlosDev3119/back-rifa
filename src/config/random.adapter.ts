import crypto from 'crypto';


export class GenerateNumberRand {

    static getNumber = () => {

        const buffer = crypto.randomBytes(3);
  
        const numeroHexadecimal = buffer.toString('hex');
        
        const numeroDecimal = parseInt(numeroHexadecimal, 16);
        
        return numeroDecimal;
    }

}