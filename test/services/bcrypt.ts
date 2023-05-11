import { Either, Right } from "../../src/app/core/errors/either";
import { ErrorBase } from "../../src/app/core/errors/errorBase";
import { BcryptInterface } from "../../src/app/data/interfaces/bcrypt";

export class BcryptInMemory implements BcryptInterface{
    async hash(password: string): Promise<Either<ErrorBase, string>> {
        return Right.create("password encypted")
    }
    async compare(password: string, hash: string): Promise<Either<ErrorBase, boolean>> {
        if(password === hash) return Right.create(true)
        return Right.create(false)
    }
    
}