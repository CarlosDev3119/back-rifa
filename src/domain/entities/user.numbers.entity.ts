import { regularExps } from "../../config";
import { CustomError } from "../errors/custom.errors";

export class UserNumbersEntity {


    constructor(
        public id_user: number,
        public readonly register_number: string,
        public readonly status: string,
    ){}

    static fromObject(object: { [key:string]: any }){

        const {id_user, register_number, status} = object;

        if(!id_user) throw CustomError.badRequest('Missing id user');
        if(!register_number) throw CustomError.badRequest('Missing register number');
        if(!status) throw CustomError.badRequest('Missing status');


        return new UserNumbersEntity(id_user, register_number, status);

    }

}

