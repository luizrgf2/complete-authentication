import { ErrorBase } from "../errorBase";

export class EmailNotConfirmedError extends ErrorBase{
    constructor(){
        super("Email não confirmado pelo usuário!",401)
    }
}