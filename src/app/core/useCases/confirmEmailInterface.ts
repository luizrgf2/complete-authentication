import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";

export interface ConfirmEmailUseCaseInput{
    token:string
}

export interface ConfirmEmailUseCaseInterface{

    exec:(input:ConfirmEmailUseCaseInput)=>Promise<Either<ErrorBase,void>>
}