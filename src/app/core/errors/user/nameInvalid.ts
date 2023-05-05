import { ErrorBase } from "../errorBase";

export class NameInvalidError extends ErrorBase{
    constructor(){
        super("Nome deve ter de 4 a 60 caracteres!",400)
    }
}