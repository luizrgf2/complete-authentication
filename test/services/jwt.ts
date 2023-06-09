import { Either, Right } from "../../src/app/core/errors/either";
import { ErrorBase } from "../../src/app/core/errors/errorBase";
import { JWTInterface } from "../../src/app/data/interfaces/jwt";

export class JWTInMemory implements JWTInterface{
    encode(dataToEncode: any, tokenDurationInMilliseconds: number) : Either<ErrorBase, string>{
        return Right.create("validToken")
    }
    decode<T = any>(token: string) : Either<ErrorBase, T>{

        if(token === "userToConfirmEmail") return Right.create({id:"1",email:"teste@gmail.com"} as any)

        return Right.create(token as any)
    }

}