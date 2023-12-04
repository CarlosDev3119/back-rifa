import { Router } from "express";
import { UserController } from "./controller";
import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";

export class UserRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new UserDatasourceImpl();

        const repository = new UserRepositoryImpl( datasource );
        
        const userController = new UserController(repository)

        router.get('/numbers', userController.getNumbersUser );

        return router;
    }

}