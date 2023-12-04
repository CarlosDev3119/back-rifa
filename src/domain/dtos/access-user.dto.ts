import { regularExps } from "../../config/regular-exp";




export class AccessUserDto {


    constructor(
        public readonly email: string,
        public password: string,
        public register_number: string,
    ){}

    static create(object: { [key: string]: any }): [string?, AccessUserDto?] {

        const { email, password, register_number} = object;

        if(!email)return ['Missing email'];
        if(!regularExps.email.test(email)) return ['Email is not valid'];

        if(!password)return ['Password is not valid'];
        if( password.length < 5 )return ['Password must be at least 5 characters'];

        if(!register_number)return ['Missing register number'];


        return [undefined, new AccessUserDto(email, password, register_number)];

    }

        
}




