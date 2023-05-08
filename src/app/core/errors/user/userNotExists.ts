import { ErrorBase } from "../errorBase";

export class UserNotExistsError extends ErrorBase{
    constructor(){
        super("O usuário não existe!",404)
    }
}