import { ConfirmEmailUseCase } from "../../data/useCases/confirmEmail";
import { PrismaUserRepository } from "../../infra/repository/prismUser";
import { JWT } from "../../infra/services/jwt";
import { ConfirmEmailController } from "../controllers/confirmEmail";

export class ConfirmEmailFactory{

    static create(){
        const service3 = new JWT()
        const repository = new PrismaUserRepository()
        const useCase = new ConfirmEmailUseCase(repository,service3)
        const controller = new ConfirmEmailController(useCase)
        return controller
    }
}