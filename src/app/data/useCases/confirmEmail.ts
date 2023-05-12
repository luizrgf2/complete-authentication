import { Either, Left, Right } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";
import { ConfirmEmailUseCaseInput, ConfirmEmailUseCaseInterface } from "../../core/useCases/confirmEmailInterface";
import { TokenInvalidError } from "../errors/tokenInvalid";
import { BcryptInterface } from "../interfaces/bcrypt";
import { JWTInterface } from "../interfaces/jwt";
import { UserRepositoryInterface } from "../interfaces/repository/user";


interface TokenDecrypted{
    email?:string,
    id?:string
}

export class ConfirmEmailUseCase implements ConfirmEmailUseCaseInterface{

    constructor(
        private readonly userRepo:UserRepositoryInterface,
        private readonly jwt:JWTInterface
    ){}

    hasIdAndEmail(obj:TokenDecrypted): boolean{
        return obj && typeof obj.id === 'string' && typeof obj.email === 'string';
    }

    async exec(input: ConfirmEmailUseCaseInput) :Promise<Either<ErrorBase, void>>{
        const {token} = input

        if(!token) return Left.create(new TokenInvalidError())

        const objectDecrypted = this.jwt.decode<TokenDecrypted>(token)
        if(objectDecrypted.left) return Left.create(objectDecrypted.left)

        if(!this.hasIdAndEmail(objectDecrypted.right)) return Left.create(new TokenInvalidError())

        const confirmEmail = await this.userRepo.confirmEmail(objectDecrypted.right.id||"",objectDecrypted.right.email||"")
        if(confirmEmail.left) return Left.create(confirmEmail.left)

        return Right.create(undefined)

    }

}