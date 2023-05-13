import { UserEntity, UserInterface } from "../../core/entities/user";
import { Either, Left, Right } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";
import { RegisterUseCaseInput, RegisterUseCaseInterface, RegisterUseCaseOutput } from "../../core/useCases/registerInterface";
import { EmailAlreadyExistsError } from "../../core/errors/user/emailAlreayExists";
import { BcryptInterface } from "../interfaces/bcrypt";
import { JWTInterface } from "../interfaces/jwt";
import { UserRepositoryInterface } from "../interfaces/repository/user";
import { SMTPInterface } from "../interfaces/smtp";

export class RegisterUserUseCase implements RegisterUseCaseInterface{

    constructor(
        private readonly userRepo:UserRepositoryInterface,
        private readonly smtp:SMTPInterface,
        private readonly jwt:JWTInterface,
        private readonly bcrypt:BcryptInterface
    ){}

    private createUserEntity(email:string,name:string,password:string):Either<ErrorBase,UserEntity>{
        const userData = UserEntity.create({
            email,
            password,
            name
        })
        return userData
    }

    private async checkIfEmailExists(email:string):Promise<Either<ErrorBase,void>>{
        const userData = await this.userRepo.findByEmail(email)
        if(userData.right) return Left.create(new EmailAlreadyExistsError())
        return Right.create(undefined)
    }

    private async persistUser(user:UserEntity):Promise<Either<ErrorBase,UserEntity>>{
        const userToCreate = await this.userRepo.create({
            ...user.user
        })
        if(userToCreate.left) return Left.create(userToCreate.left)
        const userData = UserEntity.createWithoutValidations({...userToCreate.right})
        return Right.create(userData)
    }

    private createTokenToConfirmationEmail(id:string,email:string):Either<ErrorBase,string>{
        const timeDurationToken = 7200000 //2 horas de duração em milegundos
        const createToken = this.jwt.encode({id,email},timeDurationToken)
        if(createToken.left) return Left.create(createToken.left)
        return Right.create(createToken.right)
    }

    private async sendEmailToConfirmationUserRegister(token:string,email:string):Promise<Either<ErrorBase,void>>{
        const sendEmail = await this.smtp.sendConfirmationEmail(email,token)
        if(sendEmail.left) return Left.create(sendEmail.left)
        return Right.create(undefined)
    }

    private async encryptPassword(password:string):Promise<Either<ErrorBase,string>>{
        const hash = await this.bcrypt.hash(password)
        if(hash.left) return Left.create(hash.left)
        return Right.create(hash.right)
    }

    async exec (input: RegisterUseCaseInput) : Promise<Either<ErrorBase, RegisterUseCaseOutput>>{
        const {
            email,
            name,
            password,
        } = input

        const userData = this.createUserEntity(email,name,password)
        if(userData.left) return Left.create(userData.left)

        const emailExists = await this.checkIfEmailExists(email)
        if(emailExists.left) return Left.create(emailExists.left)

        const encodePass = await this.encryptPassword(password)
        if(encodePass.left) return Left.create(encodePass.left)

        userData.right.setPassword(encodePass.right)

        const createUser = await this.persistUser(userData.right)
        if(createUser.left) return Left.create(createUser.left)

        const createToken = this.createTokenToConfirmationEmail(createUser.right.user.id,email)
        if(createToken.left) return Left.create(createToken.left)

        const sendEmail = await this.sendEmailToConfirmationUserRegister(createToken.right,email)
        if(sendEmail.left) return Left.create(sendEmail.left)

        createUser.right.removePassword()
        createUser.right.removeConfirmationEmailField()
        
        return Right.create({
            user:{...createUser.right.user},
            
        })
    }

}