import { ErrorBase } from "../errorBase";

export class PasswordInvalidError extends ErrorBase{
    constructor(){
        super("Senha deve ter pelo menos uma letra maiúscula e deve estar entre 8 e 15 caracteres!",400)
    }
}