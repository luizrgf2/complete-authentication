import request from "supertest"
import { UserValid, UserWithInvalidEmail, UserWithInvalidName, UserWithInvalidPassword } from "../../../../../test/mocks/user/user"
import { App } from "../../http/express"
import { PrismaUserRepository } from "../../../infra/repository/prismUser"
import { PrismaClient } from "@prisma/client"



describe("RegisterExpressController tests", function(){

    const prisma = new PrismaClient()

    afterAll(async function(){
        await prisma.user.deleteMany({where:{}})
    })

    it("should be able create user valid", async function(){
        const data = {
            email:UserValid.email,
            name:UserValid.name,
            password:UserValid.password
        }

        const req = request(App.app)
        const res = await req.post("/user/register",).send(data)

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty("id")
        expect(res.body.name).toBe(UserValid.name)
        expect(res.body.email).toBe(UserValid.email)
    })


    it("should be able return error if try create user with email already exists", async function(){
        const data = {
            email:UserValid.email,
            name:UserValid.name,
            password:UserValid.password
        }

        const req = request(App.app)
        const res = await req.post("/user/register",).send(data)

        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty("error")
    })

    it("should be able create valid email", async function(){
        const data = {
            email:UserValid.email,
            name:UserValid.name,
            password:UserValid.password
        }

        const req = request(App.app)
        const res = await req.post("/user/register",).send(data)

        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty("error")
    })

    it("should be able return error if try create user with invalid email", async function(){
        const data = {
            email:UserWithInvalidEmail.email,
            name:UserWithInvalidEmail.name,
            password:UserWithInvalidEmail.password
        }

        const req = request(App.app)
        const res = await req.post("/user/register",).send(data)

        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty("error")
    })

    it("should be able return error if try create user with invalid password", async function(){
        const data = {
            email:UserWithInvalidPassword.email,
            name:UserWithInvalidPassword.name,
            password:UserWithInvalidPassword.password
        }

        const req = request(App.app)
        const res = await req.post("/user/register",).send(data)

        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty("error")
    })

    it("should be able return error if try create user with invalid name", async function(){
        const data = {
            email:UserWithInvalidName.email,
            name:UserWithInvalidName.name,
            password:UserWithInvalidName.password
        }

        const req = request(App.app)
        const res = await req.post("/user/register",).send(data)

        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty("error")
    })


    it("should be able return error if try create user without body", async function(){
        const req = request(App.app)
        const res = await req.post("/user/register",).send({})

        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty("error")
    })
})