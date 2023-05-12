import { UserValid, UserWithConfirmationFalse, UserWithInvalidPassword, UserWithWithoutEmail, UserWithoutConfirmation, UserWithoutPassword } from "../../../../test/mocks/user/user"
import { UserRepoInMemory } from "../../../../test/repository/user"
import { BcryptInMemory } from "../../../../test/services/bcrypt"
import { JWTInMemory } from "../../../../test/services/jwt"
import { AuthWrongError } from "../../core/errors/user/authWrong"
import { EmailNotConfirmedError } from "../../core/errors/user/emailNotConfirmed"
import { AuthUseCase } from "./auth"

describe("AuthUseCases tests", function(){

    const userRepo = new UserRepoInMemory()
    const jwt = new JWTInMemory()
    const bcrypt = new BcryptInMemory()

    it("should be able auth with user exists in database", async function(){
        userRepo.user = []
        await userRepo.create({
            ...UserValid
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.right).not.toBeUndefined()
    })

    it("should be able return error if try auth with invalid email", async function(){

        userRepo.user = []
        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

    it("should be able return error if try auth with invalid password", async function(){
        userRepo.user = []
        await userRepo.create({
            ...UserWithInvalidPassword
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

    it("should be able return error if try auth without password", async function(){
        userRepo.user = []
        await userRepo.create({
            ...UserWithoutPassword
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

    it("should be able return error if try auth without email", async function(){
        userRepo.user = []
        await userRepo.create({
            ...UserWithWithoutEmail
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

    it("should be able return error if try auth with confirmation false", async function(){

        userRepo.user = []

        await userRepo.create({
            ...UserWithConfirmationFalse
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserWithConfirmationFalse.email,password:UserWithConfirmationFalse.password})

        expect(res.left).toBeInstanceOf(EmailNotConfirmedError)
    })

    it("should be able return error if try auth without confirmation email", async function(){

        userRepo.user = []

        await userRepo.create({
            ...UserWithoutConfirmation
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserWithoutConfirmation.email,password:UserWithoutConfirmation.password})

        expect(res.left).toBeInstanceOf(EmailNotConfirmedError)
    })
})