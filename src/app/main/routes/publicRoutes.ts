import {Router} from "express"
import { RegisterExpressController } from "../controllers/express/register"
import { AuthExpressController } from "../controllers/express/auth"
import { ConfirmEmailExpressController } from "../controllers/express/confirmEmail"

export const publicRoutes = Router()

publicRoutes.post("/user/register",RegisterExpressController.exec)
publicRoutes.post("/user/auth", AuthExpressController.exec)
publicRoutes.get("/user/confirm/:token",ConfirmEmailExpressController.exec)