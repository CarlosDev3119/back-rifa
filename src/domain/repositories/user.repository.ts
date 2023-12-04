import { UpdatedStatusUserDto } from "../dtos/user-number.dto";
import { UserNumbersEntity } from "../entities/user.numbers.entity";


export abstract class UserRepository {

    abstract getNumbers(): Promise<UserNumbersEntity[]>

    abstract updateUser(updateUserNumberDto: UpdatedStatusUserDto): Promise<UserNumbersEntity>

}