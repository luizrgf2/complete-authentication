import { UserValid, UserWithInvalidEmail, UserWithInvalidName, UserWithInvalidPassword } from "../../../../test/mocks/user/user"
import { UserRepoInMemory } from "../../../../test/repository/user"
import { BcryptInMemory } from "../../../../test/services/bcrypt"
import { JWTInMemory } from "../../../../test/services/jwt"
import { SMTPInMemory } from "../../../../test/services/smtp"
import { EmailInvalidError } from "../../core/errors/user/emailInvalid"
import { NameInvalidError } from "../../core/errors/user/nameInvalid"
import { PasswordInvalidError } from "../../core/errors/user/passwordInvalid"
import { RegisterUserUseCase } from "./register"

describe("RegisterUseCase tests", function(){


    const userRepo = new UserRepoInMemory()
    const smtp = new SMTPInMemory()
    const jwt = new JWTInMemory()
    const bcrypt = new BcryptInMemory()


    it("should be able create valid user", async function (){
        const sut = new RegisterUserUseCase(
            userRepo,
            smtp,
            jwt,
            bcrypt
        )
        const result = await sut.exec(UserValid)
        expect(result.right).not.toBeUndefined()
        expect(result.right?.user.id).toBe("1")
    })

    it("should be able return error if try create user with invalid email", async function (){
        const sut = new RegisterUserUseCase(
            userRepo,
            smtp,
            jwt,
            bcrypt
        )
        const result = await sut.exec(UserWithInvalidEmail)
        expect(result.left).toBeInstanceOf(EmailInvalidError)
    })

    it("should be able return error if try create user with invalid name", async function (){
        const sut = new RegisterUserUseCase(
            userRepo,
            smtp,
            jwt,
            bcrypt
        )
        const result = await sut.exec(UserWithInvalidName)
        expect(result.left).toBeInstanceOf(NameInvalidError)
    })

    it("should be able return error if try create user with invalid password", async function (){
        const sut = new RegisterUserUseCase(
            userRepo,
            smtp,
            jwt,
            bcrypt
        )
        const result = await sut.exec(UserWithInvalidPassword)
        expect(result.left).toBeInstanceOf(PasswordInvalidError)
    })

})