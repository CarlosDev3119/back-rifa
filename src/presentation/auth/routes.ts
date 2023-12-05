import { Router } from "express";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthDatasourceImpl } from "../../infrastructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";





export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY
        )

        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        const authController = new AuthController( authRepository, emailService);

        router.post('/register', authController.registerUser);

        router.post('/login', authController.loginUser);

        router.get('/renew',[ AuthMiddleware.validateJWT], authController.renew);

        return router;
    }

}