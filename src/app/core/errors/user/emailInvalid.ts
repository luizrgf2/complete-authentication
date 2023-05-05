import { ErrorBase } from "../errorBase";

export class EmailInvalidError extends ErrorBase{
    constructor(){
        super("Email inválido!",400)
    }
}