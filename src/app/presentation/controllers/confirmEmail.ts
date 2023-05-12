import { ConfirmEmailUseCaseInput, ConfirmEmailUseCaseInterface } from "../../core/useCases/confirmEmailInterface";
import { ControllerInterface } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";

export class ConfirmEmailController implements ControllerInterface{

    constructor(
        private readonly useCase:ConfirmEmailUseCaseInterface
    ){}

    async exec(input: HttpRequest<ConfirmEmailUseCaseInput>) : Promise<HttpResponse<void>>{
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