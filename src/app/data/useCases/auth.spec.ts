import { UserValid, UserWithInvalidEmail, UserWithInvalidPassword, UserWithWithoutEmail, UserWithoutPassword } from "../../../../test/mocks/user/user"
import { UserRepoInMemory } from "../../../../test/repository/user"
import { BcryptInMemory } from "../../../../test/services/bcrypt"
import { JWTInMemory } from "../../../../test/services/jwt"
import { AuthWrongError } from "../../core/errors/user/authWrong"
import { AuthUseCase } from "./auth"

describe("AuthUseCases tests", function(){

    const userRepo = new UserRepoInMemory()
    const jwt = new JWTInMemory()
    const bcrypt = new BcryptInMemory()

    it("should be able auth with user exists in database", async function(){

        await userRepo.create({
            ...UserValid
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.right).not.toBeUndefined()
    })

    it("should be able return error if try auth with invalid email", async function(){

        
        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

    it("should be able return error if try auth with invalid password", async function(){

        await userRepo.create({
            ...UserWithInvalidPassword
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

    it("should be able return error if try auth without password", async function(){

        await userRepo.create({
            ...UserWithoutPassword
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

    it("should be able return error if try auth without email", async function(){

        await userRepo.create({
            ...UserWithWithoutEmail
        })

        const sut = new AuthUseCase(userRepo,jwt,bcrypt)
        const res = await sut.exec({email:UserValid.email,password:UserValid.password})

        expect(res.left).toBeInstanceOf(AuthWrongError)
    })

})