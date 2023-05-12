import { RegisterUserUseCase } from "../../data/useCases/register";
import { PrismaUserRepository } from "../../infra/repository/prismUser";
import { Bcrypt } from "../../infra/services/bcrypt";
import { JWT } from "../../infra/services/jwt";
import { SMTP } from "../../infra/services/smtp";
import { RegisterController } from "../controllers/register";

export class RegisterFactory{

    static create(){
        const service = new Bcrypt()
        const service2 = new SMTP()
        const service3 = new JWT()
        const repository = new PrismaUserRepository()
        const useCase = new RegisterUserUseCase(repository,service2,service3,service)
        const controller = new RegisterController(useCase)
        return controller
    }

}