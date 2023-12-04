import { CustomError, UserEntity } from "../../domain";



export class UserMapper {

  
  static userEntityFromObject(object: { [key: string]:any }) {

    const { 
        id_user,
        email, 
        password,
        register_number,
        status,
    } = object;

    if ( !id_user ) {
      throw CustomError.badRequest('Missing id');
    }

    if(!email) throw CustomError.badRequest('Missing email');

    if(!password)throw CustomError.badRequest('Password is not valid');
    if(!register_number)throw CustomError.badRequest('Register number is not valid');
  

    return new UserEntity(id_user, email, password,register_number, status);
  }




}