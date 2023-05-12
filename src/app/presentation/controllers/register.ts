import { RegisterUseCaseInput, RegisterUseCaseInterface, RegisterUseCaseOutput } from "../../core/useCases/registerInterface";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class RegisterController implements ControllerInterface{

    constructor(
        private readonly useCase:RegisterUseCaseInterface
    ){}

    async exec(input: HttpRequest<RegisterUseCaseInput>) : Promise<HttpResponse<RegisterUseCaseOutput>>{
        const {body} = input
        if(!body) return {status:400,error:"Campo inválido"}
        const res = await this.useCase.exec(body)
        if(res.left) return {
            status:res.left.code,
            error:res.left.message
        }
        return{
            status:201,
            body:res.right
        }
    }
}