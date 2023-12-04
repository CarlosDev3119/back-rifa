import { Router } from 'express'
import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './users/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/ruleta/auth', AuthRoutes.routes );
        router.use('/api/v1/ruleta/users', UserRoutes.routes );

        return router
    }

}

