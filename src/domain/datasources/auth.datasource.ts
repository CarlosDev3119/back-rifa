import { AccessUserDto } from '../dtos/access-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserEntity } from '../entities/user.entity';


export abstract class AuthDatasource  {

    abstract login( loginUserDto: LoginUserDto ): Promise<UserEntity>
    
    abstract register( accessUserDto: AccessUserDto ): Promise<UserEntity>

}