import { Request, Response } from "express";
import { AccessUserDto, AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RenewUser } from "../../domain";
import { GenerateNumberRand } from "../../config/random.adapter";
import { EmailService } from "../services/email.service";

type RandomNumber = () => number;

export class AuthController {

    constructor(
       private readonly authRepository: AuthRepository,
       private readonly emailService: EmailService,
       private readonly randomGenerator: RandomNumber = GenerateNumberRand.getNumber,

    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = AccessUserDto.create( {...req.body, register_number: this.randomGenerator().toString() } );
        if(error) return res.status(400).json({ error });

        new RegisterUser( this.authRepository, this.emailService).execute( registerUserDto!)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))

    }

    loginUser = (req: Request, res: Response) => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({ error });
        
        new LoginUser( this.authRepository )
            .execute( loginUserDto!)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))

    }

    renew = (req: Request, res: Response) => {
        const user = req.body.user;
        new RenewUser().execute(user)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))
    }
    

}

