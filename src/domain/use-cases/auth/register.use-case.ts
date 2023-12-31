import { JwtAdapter } from "../../../config/jwt.adapter";
import { EmailService } from "../../../presentation/services/email.service";
import { AccessUserDto } from "../../dtos/access-user.dto";
import { CustomError } from "../../errors/custom.errors";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
    token: string;
    user: {
        id_user: number;
        email: string;
        register_number: string;
    }
  }

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
    execute( registerUserDto: AccessUserDto ): Promise<UserToken>;
  }

export class RegisterUser implements RegisterUserUseCase {


    constructor(
        private readonly authRepository: AuthRepository,
        private readonly emailService: EmailService,
        private readonly signToken: SignToken = JwtAdapter.generateToken,

    ){}

    async execute(registerUserDto: AccessUserDto): Promise<UserToken> {
        
        const user = await this.authRepository.register(registerUserDto);

        const token = await this.signToken({id_user: user.id_user});
        if ( !token ) throw CustomError.internalServer('Error generating token');
        await this.sendEmailValidate(user.email, user.register_number);
        
        const {password, ...restUser} = user;

        return {
            token: token,
            user: restUser
        }
    }

    private sendEmailValidate = async (email: string, register_number: string) => {

        
        const html = `
                <div>
                    <h1>¡Hola!</h1>
                    <p>Hola me complace informate que tu boleto se ha registrado correctamente</p>
                    <h3>${register_number}.</h3>

                    <h5>Por seguridad tomar una captura de pantalla del número de rifa.</h5>

                    <p>Recuerda que siempre puedes validar tu boleto en el sitio oficial.</p>
                    <a href="https://front-rifa-production.up.railway.app/auth/login"> Link de la página de la rifa</a>
                </div>
            
        `;

        const options = {
            to: email,
            subject: 'Boleto de rifa SMARTFORCE',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options);
        console.log(isSent);
        if(!isSent) throw CustomError.internalServer('Error sending email');

        return true;

    }


}