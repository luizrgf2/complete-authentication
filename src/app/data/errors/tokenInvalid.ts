import { ErrorBase } from "../../core/errors/errorBase";

export class TokenInvalidError extends ErrorBase{
    constructor(){
        super("O token fornecido não é válido!",401)
    }
}