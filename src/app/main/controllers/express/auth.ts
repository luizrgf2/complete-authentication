import {Request,Response} from "express"
import { AuthFactory } from "../../../presentation/factories/auth"


export class AuthExpressController{

    static async exec(req:Request,res:Response){
        const factory = AuthFactory.create()
        const response = await factory.exec({
            body:req.body
        })

        if(response.error) return res.status(response.status).send({error:response.error})
        res.status(response.status).send(response.body)
    }

}