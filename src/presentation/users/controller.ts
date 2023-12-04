import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { GetRegisterNumber } from "../../domain/use-cases/users/get-register-number.use-case";
import { UserRepository } from "../../domain/repositories/user.repository";


export class UserController {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getNumbersUser = (req: Request, res: Response) => {
        
        new GetRegisterNumber( this.userRepository ).execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))

    }

    updateStateNumbers(){}

}