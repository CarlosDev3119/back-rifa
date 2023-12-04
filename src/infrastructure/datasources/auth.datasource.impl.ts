import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { prisma } from "../../data/mysql/config";
import { AccessUserDto, AuthDatasource, CustomError, LoginUserDto, UserEntity } from "../../domain";
import { EmailService } from "../../presentation/services/email.service";
import { UserMapper } from "../mappers/user.mapper";



type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){}
    

    
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const {email, password} = loginUserDto;

        try {
            const existUser = await prisma.registros.findFirst( { 
                where: {
                    email: email
                }
            } );

     
            if ( !existUser ) throw CustomError.badRequest('User does not exists - email');
      
            const isMatching = this.comparePassword(password, existUser.password);
            if ( !isMatching ) throw CustomError.badRequest('Password is not valid');
      
            return UserMapper.userEntityFromObject(existUser);
      
      
          } catch (error) {
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
          }

    
    }

    async register(registerUserDto: AccessUserDto): Promise<UserEntity> {

        const { email, password } = registerUserDto;
        
        try{
            
            const existUser = await prisma.registros.findFirst( { 
                where: {
                    OR: [
                        {email: email},
                        {register_number: registerUserDto.register_number}
                    ]
                    
                }
            } );
            
            if(existUser) throw CustomError.badRequest('An error ocurred while created user ');
            
            registerUserDto.password = this.hashPassword( password );
            
            const user = await prisma.registros.create({ 
                data: registerUserDto!,
            });            


            return UserMapper.userEntityFromObject(user);

        }catch(error){

            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
        
    }



    

}