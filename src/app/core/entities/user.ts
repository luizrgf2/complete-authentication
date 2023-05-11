import { Either, Left, Right } from "../errors/either"
import { ErrorBase } from "../errors/errorBase"
import { EmailInvalidError } from "../errors/user/emailInvalid"
import { NameInvalidError } from "../errors/user/nameInvalid"
import { PasswordInvalidError } from "../errors/user/passwordInvalid"

export interface UserInterface{
    id:string
    createdAt:Date,
    updatedAt:Date,
    name:string,
    email:string,
    password:string
}


export class UserEntity{
    user:UserInterface

    constructor(user:UserInterface){
        this.user = user
    }

    isValidPassword(): boolean {
        if(!this.user.password) return false
        if (this.user.password.length < 8 || this.user.password.length > 15) {
          return false; 
        }
        if (!/[A-Z]/.test(this.user.password)) {
          return false;
        }
        return true;
    }

    isValidEmail(): boolean {
        if(!this.user.email) return false
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(this.user.email);
    }

    isValidName(): boolean {
        if(!this.user.name) return false
        return this.user.name.length >= 4 && this.user.name.length <= 60;
    }

    removePassword() {
        this.user.password = ""
    }

    setPassword(password:string){
        this.user.password = password
    }

    static create(userData:Omit<UserInterface,"id"|"createdAt"|"updatedAt">):Either<ErrorBase,UserEntity>{
        const user = new UserEntity({
            ...userData,
            id:"",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if(!user.isValidEmail()) return Left.create(new EmailInvalidError())  
        if(!user.isValidName()) return Left.create(new NameInvalidError())      
        if(!user.isValidPassword()) return Left.create(new PasswordInvalidError())      

        return Right.create(user)
    }

    static createWithoutValidations(user:UserInterface):UserEntity{
        return new UserEntity(user)
    }
}