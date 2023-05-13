import {Request,Response} from "express"
import { ConfirmEmailFactory } from "../../../presentation/factories/confirmEmail"


export class ConfirmEmailExpressController{

    static async exec(req:Request,res:Response){
        const token = req.params.token
        const factory = ConfirmEmailFactory.create()
        const response = await factory.exec({
            body:{
                token:token
            }
        })

        if(response.error) return res.status(response.status).send({error:response.error})
        res.status(response.status).send(response.body)
    }
}