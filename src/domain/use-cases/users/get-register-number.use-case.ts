import { UserNumbersEntity } from "../../entities/user.numbers.entity";
import { UserRepository } from "../../repositories/user.repository";


interface GetRegisterNumberUseCase {
    execute(): Promise<UserNumbersEntity[]>;
  }

export class GetRegisterNumber implements GetRegisterNumberUseCase {


    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async execute(): Promise<UserNumbersEntity[]> {

        return await this.userRepository.getNumbers();

    }

}