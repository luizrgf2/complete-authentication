import express,{Express} from "express"
import cors from "cors"
import { publicRoutes } from "../routes/publicRoutes"

export class ExpressServer{
    private app:Express

    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    private middleware(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors())
    }

    private routes(){
        this.app.use(publicRoutes)
    }

    public start(port?:number){
        const portFinal = port === undefined ? 8080 : port
        this.app.listen(port === undefined ? 8080 : portFinal,()=>{
            console.log(`Server express is started in http://localhost:${portFinal}`)
        })
    }
}