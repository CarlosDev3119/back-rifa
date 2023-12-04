import { NextFunction, Request, Response } from "express";

import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/mysql/config";
import { UserMapper } from "../../infrastructure/mappers/user.mapper";

enum Status {
    active= 'active',
    inactive= 'inactive',
}


export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction){

        const authorization = req.header('Authorization');

        if( !authorization ) return res.status(401).json({error: 'No token provided'});
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Bearer token'});

        const token = authorization.split(' ').at(1) || '';

        try{

            const payload = await JwtAdapter.validateToken<{id_user: string}>(token);
            if(!payload) return res.status(401).json({error: 'Invalid token'});

            const user = await prisma.registros.findFirst( {
                where: {
                    id_user: +payload.id_user,
                }
            } );
            //validar estatus del usuario

            if( !user ) return res.status(401).json({ error: 'Invalid token - user'});
            
            req.body.user = UserMapper.userEntityFromObject(user);

            next();


        }catch(error){

            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }

    }

}