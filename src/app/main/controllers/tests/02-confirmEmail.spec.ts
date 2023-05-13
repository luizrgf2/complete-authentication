import { UserValid } from "../../../../../test/mocks/user/user"
import { PrismaUserRepository } from "../../../infra/repository/prismUser"
import { JWT } from "../../../infra/services/jwt"
import request from "supertest"
import { App } from "../../http/express"


describe("ConfirmEmailExpressController", function(){

    const userRepo = new PrismaUserRepository()
    let idToTeste = ""

    let token = ""
    
    beforeAll(async function(){
        const user = await userRepo.create(UserValid)
        if(user.left) return
        const data = {id:"",email:""}
        
        data.email = user.right.email
        data.id = user.right.id
        
        const jwt = new JWT()
        const tokenJWT = jwt.encode({id:user.right.id,email:user.right.email},100000)
        if(tokenJWT.left) return
        token = tokenJWT.right
    })

    afterAll(async function(){
        await userRepo.deleteById(idToTeste)
    })

    it("should be able confirm email with valid token", async function(){
        let user = await userRepo.findByEmail(UserValid.email)
        if(user.left) return

        const req = request(App.app)
        const res = await req.get("/user/confirm/"+token)
        expect(res.statusCode).toEqual(200)
        user = await userRepo.findByEmail(UserValid.email)
        if(user.left) return
        expect(user.right.accountConfirmed).toEqual(true)
    })

    it("should be able return error if try confirm email with invalid token", async function(){
        const req = request(App.app)
        const res = await req.get("/user/confirm/"+"invalid token")
        expect(res.body).toHaveProperty("error")
        expect(res.statusCode).toEqual(401)
    })

})