import { ErrorBase } from "../errorBase";

export class EmailAlreadyExistsError extends ErrorBase{
    constructor(){
        super("O email já existe!",401)
    }
}