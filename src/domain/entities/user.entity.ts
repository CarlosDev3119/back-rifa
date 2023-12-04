import { regularExps } from "../../config";
import { CustomError } from "../errors/custom.errors";


export class UserEntity {


    constructor(
        public id_user: number,
        public readonly email: string,
        public readonly password: string,
        public readonly register_number: string,
        public readonly status: string,
    ){}

    static fromObject(object: { [key:string]: any }){

        const {id_user, email, password, register_number, status} = object;

        if(!id_user) throw CustomError.badRequest('Missing id_user');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!regularExps.email.test(email)) throw CustomError.badRequest('Email is not valid');

        if(!password)throw CustomError.badRequest('Password is not valid');
        if( password.length < 5 )throw CustomError.badRequest('Password must be at least 5 characters');

        return new UserEntity(id_user, email, password, register_number, status);

    }

}

