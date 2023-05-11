import { ErrorBase } from "../errorBase";

export class AuthWrongError extends ErrorBase{
    constructor(){
        super("Email ou senha errado!",401)
    }
}