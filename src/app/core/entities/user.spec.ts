import { UserValid, UserWithInvalidEmail, UserWithInvalidName, UserWithInvalidPassword, UserWithWithoutEmail, UserWithWithoutName, UserWithoutPassword } from "../../../../test/mocks/user/user"
import { EmailInvalidError } from "../errors/user/emailInvalid"
import { NameInvalidError } from "../errors/user/nameInvalid"
import { PasswordInvalidError } from "../errors/user/passwordInvalid"
import { UserEntity } from "./user"

describe("UserEntity tests", function(){

    it("should be able create user with valid user", function(){
        const sut = UserEntity.create({...UserValid})
        expect(sut.left).toBeUndefined()
        expect(sut.right).toBeInstanceOf(UserEntity)
    })

    it("should be able return error to create user with invalid email", function(){
        const sut = UserEntity.create({...UserWithInvalidEmail})
        expect(sut.left).toBeInstanceOf(EmailInvalidError)
    })

    it("should be able return error to create user with invalid password", function(){
        const sut = UserEntity.create({...UserWithInvalidPassword})
        expect(sut.left).toBeInstanceOf(PasswordInvalidError)
    })

    it("should be able return error to create user with invalid name", function(){
        const sut = UserEntity.create({...UserWithInvalidName})
        expect(sut.left).toBeInstanceOf(NameInvalidError)
    })

    it("should be able return error to create user without email", function(){
        const sut = UserEntity.create({...UserWithWithoutEmail})
        expect(sut.left).toBeInstanceOf(EmailInvalidError)
    })

    it("should be able return error to create user without password", function(){
        const sut = UserEntity.create({...UserWithoutPassword})
        expect(sut.left).toBeInstanceOf(PasswordInvalidError)
    })

    it("should be able return error to create user without name", function(){
        const sut = UserEntity.create({...UserWithWithoutName})
        expect(sut.left).toBeInstanceOf(NameInvalidError)
    })

})