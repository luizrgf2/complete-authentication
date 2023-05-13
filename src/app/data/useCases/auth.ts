import { UserEntity } from "../../core/entities/user";
import { Either, Left, Right } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";
import { AuthWrongError } from "../../core/errors/user/authWrong";
import { EmailNotConfirmedError } from "../../core/errors/user/emailNotConfirmed";
import { UserNotExistsError } from "../../core/errors/user/userNotExists";
import { AuthUseCaseInput, AuthUseCaseInterface, AuthUseCaseOutput } from "../../core/useCases/authInterface";
import { BcryptInterface } from "../interfaces/bcrypt";
import { JWTInterface } from "../interfaces/jwt";
import { UserRepositoryInterface } from "../interfaces/repository/user";

export class AuthUseCase implements AuthUseCaseInterface{

    constructor(
        private readonly userRepo:UserRepositoryInterface,
        private readonly jwt:JWTInterface,
        private readonly bcrypt:BcryptInterface
    ){}


    private async checkIfEmailExists(email:string):Promise<Either<ErrorBase,UserEntity>>{
        const userData = await this.userRepo.findByEmail(email)
        
        if(userData.left){
            if(userData.left instanceof UserNotExistsError){
                return Left.create(new AuthWrongError())
            }
            return  Left.create(userData.left)
        }

        const userModel = UserEntity.createWithoutValidations(userData.right)
        return Right.create(userModel)
    }

    private async checkIfPasswordIsCorrect(passwordToVerify:string, passwordOfUser:string):Promise<Either<ErrorBase,boolean>>{
        const isPasswordCorrect = await this.bcrypt.compare(passwordToVerify,passwordOfUser)
        if(isPasswordCorrect.left) return Left.create(isPasswordCorrect.left)
        return Right.create(isPasswordCorrect.right)
    }

    async exec(input: AuthUseCaseInput) : Promise<Either<ErrorBase, AuthUseCaseOutput>>{
        const {email,password} = input
        
        const userData = await this.checkIfEmailExists(email)
        if(userData.left) return Left.create(userData.left)       

        if(userData.right.user.accountConfirmed === false || userData.right.user.accountConfirmed === undefined) return Left.create(new EmailNotConfirmedError())

        const passwordIsCorrect = await this.checkIfPasswordIsCorrect(password,userData.right.user.password)
        if(passwordIsCorrect.left) return Left.create(passwordIsCorrect.left)

        if(!passwordIsCorrect.right) return Left.create(new AuthWrongError())

        const durationOfTokenInMileseconds = 86400000 // 24 hours in mileseconds

        const tokenJWT = this.jwt.encode({id:userData.right.user.id},durationOfTokenInMileseconds)
        if(tokenJWT.left) return Left.create(tokenJWT.left)

        userData.right.removePassword()
        userData.right.removeConfirmationEmailField()

        return Right.create({
            token:tokenJWT.right,
            user: userData.right.user
        })

    }
}