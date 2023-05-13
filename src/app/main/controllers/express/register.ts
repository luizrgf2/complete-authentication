import {Request,Response} from "express"
import { RegisterFactory } from "../../../presentation/factories/register"


export class RegisterExpressController{

    static async exec(req:Request,res:Response){
        const factory = RegisterFactory.create()
        const response = await factory.exec({
            body:req.body
        })

        if(response.error) return res.status(response.status).send({error:response.error})
        res.status(response.status).send(response.body)
    }

}