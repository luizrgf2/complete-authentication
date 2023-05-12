import { UserInterface } from "../entities/user";
import { Either } from "../errors/either";
import { ErrorBase } from "../errors/errorBase";


export interface RegisterUseCaseInput extends Omit<UserInterface,"id"|"createdAt"|"updatedAt"|"accountConfirmed">{}

export interface RegisterUseCaseOutput{
    user:UserInterface
}

export interface RegisterUseCaseInterface{
    exec:(input:RegisterUseCaseInput)=>Promise<Either<ErrorBase,RegisterUseCaseOutput>>
}