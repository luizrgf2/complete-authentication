import { UserValid } from "../../../../test/mocks/user/user"
import { UserRepoInMemory } from "../../../../test/repository/user"
import { JWTInMemory } from "../../../../test/services/jwt"
import { UserNotExistsError } from "../../core/errors/user/userNotExists"
import { TokenInvalidError } from "../errors/tokenInvalid"
import { ConfirmEmailUseCase } from "./confirmEmail"

describe("ConfirmEmailUseCase tests", function(){
    
    const userRepo = new UserRepoInMemory()
    const jwt = new JWTInMemory()
    const validTokenToTestUserConfirmation = "userToConfirmEmail"
    
    it("should be able confirm valid user", async function(){
        
        userRepo.create({
            ...UserValid,
            accountConfirmed:false
        })

        const sut = new ConfirmEmailUseCase(userRepo,jwt)
        const res = await sut.exec({token:validTokenToTestUserConfirmation})
        expect(res.left).toBeUndefined()
        expect(userRepo.user[0].accountConfirmed).toBe(true)
    })

    it("should be able return invalidTokenError if try confirm email with invalid token", async function(){
        userRepo.user = []
        userRepo.create({
            ...UserValid,
            accountConfirmed:false
        })

        const sut = new ConfirmEmailUseCase(userRepo,jwt)
        const res = await sut.exec({token:"invalidToken"})
        expect(res.left).toBeInstanceOf(TokenInvalidError)
    })

    it("should be able return TokenInvalidError if try confirm email without token", async function(){
        userRepo.user = []

        const sut = new ConfirmEmailUseCase(userRepo,jwt)
        const res = await sut.exec({token:undefined as any})
        expect(res.left).toBeInstanceOf(TokenInvalidError)
    })

    it("It should be possible to return UserNotExists if trying to confirm an email with a valid token but the user no longer exists in the database", async function(){
        userRepo.user = []

        const sut = new ConfirmEmailUseCase(userRepo,jwt)
        const res = await sut.exec({token:validTokenToTestUserConfirmation})
        expect(res.left).toBeInstanceOf(UserNotExistsError)
    })

})