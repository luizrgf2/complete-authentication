import { UserValid } from "../../../../test/mocks/user/user"
import { EmailAlreadyExistsError } from "../../core/errors/user/emailAlreayExists"
import { UserNotExistsError } from "../../core/errors/user/userNotExists"
import { PrismaUserRepository } from "./prismUser"

describe("PrismaUserRepository tests",  function(){

    let idWillTested = ""

    it("should be able create valid user", async function(){
        const sut = new PrismaUserRepository()
        const res = await sut.create({...UserValid})

        expect(res.left).toBeUndefined()
        expect({...res.right,createdAt:undefined,updatedAt:undefined,id:undefined}).toEqual(UserValid)
        if(res.left) return
        idWillTested = res.right.id
    })

    it("should be able return error if create user with email alreay exists", async function(){
        const sut = new PrismaUserRepository()
        const res = await sut.create({...UserValid})

        expect(res.left).toBeInstanceOf(EmailAlreadyExistsError)
    })

    
    it("should be able find valid user with id", async function(){
        const sut = new PrismaUserRepository()
        const res = await sut.findById(idWillTested)

        expect(res.left).toBeUndefined()
        expect({...res.right,createdAt:undefined,updatedAt:undefined,id:undefined}).toEqual(UserValid)
        if(res.left) return
    })

    it("should be able find valid user with email", async function(){
        const sut = new PrismaUserRepository()
        const res = await sut.findByEmail(UserValid.email)

        expect(res.left).toBeUndefined()
        expect({...res.right,createdAt:undefined,updatedAt:undefined,id:undefined}).toEqual(UserValid)
        if(res.left) return
    })

    it("should be able return userNotExistsError if try find user id not exists", async function(){
        const sut = new PrismaUserRepository()
        const res = await sut.findById("id not exists")

        expect(res.left).toBeInstanceOf(UserNotExistsError)
    })

    it("should be able return userNotExistsError if try find user email not exists", async function(){
        const sut = new PrismaUserRepository()
        const res = await sut.findByEmail("email not exists")

        expect(res.left).toBeInstanceOf(UserNotExistsError)
    })
    
    it("should be able delete valid user with id", async function(){
        const sut = new PrismaUserRepository()
        const res = await sut.deleteById(idWillTested)

        expect(res.left).toBeUndefined()

        const findRes = await sut.findById(idWillTested);
        expect(findRes.left).toBeInstanceOf(UserNotExistsError);
        
    })


})