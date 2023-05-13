import { UserValid } from "../../../../../test/mocks/user/user"
import { PrismaUserRepository } from "../../../infra/repository/prismUser"
import request from "supertest"
import { App } from "../../http/express"
import { Bcrypt } from "../../../infra/services/bcrypt"


describe("AuthUserExpressController tests", function(){

    const userRepo = new PrismaUserRepository()
    const bcrypt = new Bcrypt()



    it("should be able confirm email with valid token", async function(){
        const password = await bcrypt.hash(UserValid.password)
        if(password.left) return

        const user = await userRepo.create({
            email:UserValid.email,
            name:UserValid.name,
            password:password.right,
            accountConfirmed:true
        })
        if(user.left) return

        const data = {
            email:UserValid.email,
            password:UserValid.password
        }

        const req = request(App.app)
        const res = await req.post("/user/auth").send(data)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("token")
        expect(res.body).toHaveProperty("user")
        expect(res.body.user).toHaveProperty("id")
        expect(res.body.user.email).toBe(UserValid.email)
        expect(res.body.user.name).toBe(UserValid.name)
        await userRepo.deleteById(user.right.id)


    })

    it("should be able return error if try auth with email not confirmed", async function(){
        const password = await bcrypt.hash(UserValid.password)
        if(password.left) return

        const user = await userRepo.create({
            email:"teste-email-not-confirmed@gmail.com",
            name:UserValid.name,
            password:password.right,
            accountConfirmed:false
        })

        if(user.left) return

        const data = {
            email:"teste-email-not-confirmed@gmail.com",
            password:UserValid.password
        }

        const req = request(App.app)
        const res = await req.post("/user/auth").send(data)

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("error")
        await userRepo.deleteById(user.right.id)
    })

    it("should be able return error if try auth with email not exists", async function(){

        const data = {
            email:"not-exists@gmail.com",
            password:UserValid.password
        }

        const req = request(App.app)
        const res = await req.post("/user/auth").send(data)

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("error")
    })

    it("should be able return error if try auth with password wrong", async function(){


        const data = {
            email:UserValid.email,
            password:"invalid-pass"
        }

        const req = request(App.app)
        const res = await req.post("/user/auth").send(data)

        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty("error")
    })

})