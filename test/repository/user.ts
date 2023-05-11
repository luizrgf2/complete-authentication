import { UserInterface } from "../../src/app/core/entities/user";
import { Either, Left, Right } from "../../src/app/core/errors/either";
import { ErrorBase } from "../../src/app/core/errors/errorBase";
import { UserNotExistsError } from "../../src/app/core/errors/user/userNotExists";
import { UserRepositoryInterface } from "../../src/app/data/interfaces/repository/user";

export class UserRepoInMemory implements UserRepositoryInterface{

    user:UserInterface[] = []

    async create (user: Omit<UserInterface, "id" | "createdAt" | "updatedAt">) : Promise<Either<ErrorBase, UserInterface>>{
        const userCreated = {
            ...user,
            createdAt:new Date('2023-05-01'),
            updatedAt:new Date('2023-05-01'),
            id:"1"
        } as UserInterface
        this.user.push(userCreated)
        return Right.create(userCreated)
    }

    async findByEmail (email: string) : Promise<Either<ErrorBase, UserInterface>>{
        const userToFind = this.user.filter(item=>item.email === email)
        if(userToFind.length === 0) return Left.create(new UserNotExistsError())
        return Right.create(userToFind[0])
    }

    async findById (id: string) : Promise<Either<ErrorBase, UserInterface>>{
        const userToFind = this.user.filter(item=>item.id === id)
        if(userToFind.length === 0) return Left.create(new UserNotExistsError())
        return Right.create(userToFind[0])
    }


}