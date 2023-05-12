import { Either } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";
import { HttpRequest, HttpResponse } from "./http";




export interface ControllerInterface{
    validateInputFields?:(body:any)=>Either<ErrorBase,void>
    exec:(input:HttpRequest)=>Promise<HttpResponse>
}