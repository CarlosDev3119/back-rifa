import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UpdatedStatusUserDto } from "../../domain/dtos/user-number.dto";
import { UserNumbersEntity } from "../../domain/entities/user.numbers.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly userDataSource: UserDatasource,
    ){}

    getNumbers(): Promise<UserNumbersEntity[]> {
        return this.userDataSource.getNumbers()
    }
    updateUser(updateUserNumberDto: UpdatedStatusUserDto): Promise<UserNumbersEntity> {
        throw new Error("Method not implemented.");
    }
    
}