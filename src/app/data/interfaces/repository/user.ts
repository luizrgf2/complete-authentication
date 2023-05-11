import { UserInterface } from "../../../core/entities/user";
import { Either } from "../../../core/errors/either";
import { ErrorBase } from "../../../core/errors/errorBase";

export interface UserRepositoryInterface{
    create:(user:Omit<UserInterface,"id"|"createdAt"|"updatedAt">)=>Promise<Either<ErrorBase,UserInterface>>
    findByEmail:(email:string)=>Promise<Either<ErrorBase,UserInterface>>
    findById:(id:string)=>Promise<Either<ErrorBase,UserInterface>>
    deleteById: (id: string)=>Promise<Either<ErrorBase, void>> 
}