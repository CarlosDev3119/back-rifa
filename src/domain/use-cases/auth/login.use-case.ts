import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos/login-user.dto";
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

interface LoginUseCase {
    execute( loginUseDto: LoginUserDto ): Promise<UserToken>;
  }

export class LoginUser implements LoginUseCase {


    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}

    async execute(loginUseDto: LoginUserDto): Promise<UserToken> {

        const user = await this.authRepository.login(loginUseDto);

        const token = await this.signToken({id_user: user.id_user});
        if ( !token ) throw CustomError.internalServer('Error generating token');
        const {password, ...restUser} = user;
        return {
            token: token,
            user: restUser
        }
    }

}