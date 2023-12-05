import { prisma } from "../../data/mysql/config";
import { CustomError } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UpdatedStatusUserDto } from "../../domain/dtos/user-number.dto";
import { UserNumbersEntity } from '../../domain/entities/user.numbers.entity';


export class UserDatasourceImpl implements UserDatasource {

    async getNumbers(): Promise<UserNumbersEntity[]> {
        
        try{

            const userNumbers = await prisma.registros.findMany({
                where: {
                    status: '1',
                    register_number: {
                        not: "2482258"
                    }
                },
                select: {
                    id_user:true,
                    register_number: true,
                    status: true
                }
            })


            return userNumbers.map( user => UserNumbersEntity.fromObject(user) )

        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }

    }
    updateUser(updateUserNumberDto: UpdatedStatusUserDto): Promise<UserNumbersEntity> {
        throw new Error("Method not implemented.");
    }

}