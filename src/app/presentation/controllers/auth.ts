import { AuthUseCaseInput, AuthUseCaseInterface, AuthUseCaseOutput } from "../../core/useCases/authInterface";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class AuthController implements ControllerInterface{

    constructor(
        private readonly useCase:AuthUseCaseInterface
    ){}

    async exec(input: HttpRequest<AuthUseCaseInput>) : Promise<HttpResponse<AuthUseCaseOutput>>{
        const {body} = input
        if(!body) return {status:400,error:"Campo inválido"}
        const res = await this.useCase.exec(body)
        if(res.left) return {
            status:res.left.code,
            error:res.left.message
        }
        return{
            status:200,
            body:res.right
        }
    }
}