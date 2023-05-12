import { AuthUseCase } from "../../data/useCases/auth";
import { PrismaUserRepository } from "../../infra/repository/prismUser";
import { Bcrypt } from "../../infra/services/bcrypt";
import { JWT } from "../../infra/services/jwt";
import { AuthController } from "../controllers/auth";

export class AuthFactory{

    static create(){
        const service = new Bcrypt()
        const service3 = new JWT()
        const repository = new PrismaUserRepository()
        const useCase = new AuthUseCase(repository,service3,service)
        const controller = new AuthController(useCase)
        return controller
    }

}