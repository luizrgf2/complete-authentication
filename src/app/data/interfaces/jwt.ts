import { Either } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";

export interface JWTInterface{
    encode:(dataToEncode:any, tokenDurationInMilliseconds:number)=>Either<ErrorBase,string>
    decode:<T=any>(token:string)=>Either<ErrorBase,T>
}