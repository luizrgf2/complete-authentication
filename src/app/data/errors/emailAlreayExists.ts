import { ErrorBase } from "../../core/errors/errorBase";

export class EmailAlreadyExistsError extends ErrorBase{
    constructor(){
        super("O email já existe!",401)
    }
}