import { UserInterface } from "../entities/user";
import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";


export interface AuthUseCaseInput extends Omit<UserInterface,"id"|"createdAt"|"updatedAt"|"name"|"accountConfirmed">{}

export interface AuthUseCaseOutput{
    user:UserInterface,
    token:string
}

export interface AuthUseCaseInterface{
    exec:(input:AuthUseCaseInput)=>Promise<Either<ErrorBase,AuthUseCaseOutput>>
}