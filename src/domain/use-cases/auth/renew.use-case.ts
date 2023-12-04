import { JwtAdapter } from "../../../config/jwt.adapter";
import { UserEntity } from "../../entities/user.entity";
import { CustomError } from "../../errors/custom.errors";

interface UserToken {
    token: string;
    user: {
        id_user: number;
        email: string;
        register_number: string;
    }
  }

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RenewUseCase {
    execute( user: UserEntity ): Promise<UserToken>;
  }

export class RenewUser implements RenewUseCase {


    constructor(
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}

    async execute(user: UserEntity): Promise<UserToken> {

        
        const token = await this.signToken({id_user: user.id_user});
        if ( !token ) throw CustomError.internalServer('Error generating token');
        const {password, ...restuser } = user
        return {
            token: token,
            user: restuser
        }
    }

}