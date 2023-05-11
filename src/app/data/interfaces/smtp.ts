import { Either } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";

export interface SMTPInterface{
    sendConfirmationEmail:(to:string,confirmationToken:string)=>Promise<Either<ErrorBase,void>>
}