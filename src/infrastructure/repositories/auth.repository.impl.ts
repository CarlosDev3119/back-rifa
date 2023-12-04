import { AccessUserDto, AuthDatasource, AuthRepository, LoginUserDto, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
    register(registerUserDto: AccessUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

}