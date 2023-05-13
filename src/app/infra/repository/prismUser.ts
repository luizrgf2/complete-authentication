import { PrismaClient, User } from '@prisma/client';
import { UserInterface } from '../../core/entities/user';
import { UserRepositoryInterface } from '../../data/interfaces/repository/user';
import { Either, Left, Right } from '../../core/errors/either';
import { ErrorBase } from '../../core/errors/errorBase';
import { UserNotExistsError } from '../../core/errors/user/userNotExists';
import { EmailAlreadyExistsError } from '../../core/errors/user/emailAlreayExists';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepositoryInterface {

  async create(user: Omit<UserInterface, 'id' | 'createdAt' | 'updatedAt'>): Promise<Either<ErrorBase, UserInterface>> {
    try {
      const createdUser = await prisma.user.create({ data: {...user,id:undefined} });
      return Right.create(createdUser as UserInterface);
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return Left.create(new EmailAlreadyExistsError());
      }
      return Left.create(new ErrorBase(error.message, 400));
    }
  }

  async findByEmail(email: string): Promise<Either<ErrorBase, UserInterface>> {
    try {
      const foundUser = await prisma.user.findUnique({ where: { email } });
      return foundUser ? Right.create(foundUser as UserInterface) : Left.create(new UserNotExistsError());
    } catch (error: any) {
      return Left.create(new ErrorBase(error.message, 500));
    }
  }

  async findById(id: string): Promise<Either<ErrorBase, UserInterface>> {
    try {
      const foundUser = await prisma.user.findUnique({ where: { id } });
      return foundUser ? Right.create(foundUser as UserInterface) : Left.create(new UserNotExistsError());
    } catch (error: any) {
      return Left.create(new ErrorBase(error.message, 500));
    }
  }

  async deleteById(id: string): Promise<Either<ErrorBase, void>> {
    try {
      const deletedUser = await prisma.user.delete({ where: { id } });
      if (deletedUser) {
        return Right.create(undefined);
      } else {
        return Left.create(new UserNotExistsError());
      }
    } catch (error: any) {
      return Left.create(new ErrorBase(error.message, 500));
    }
  }

  async confirmEmail (id: string, email: string) : Promise<Either<ErrorBase, void>>{
    try{

        const userExists = await prisma.user.findFirst({where:{
          id:id,
          email:email
        }})

        if(!userExists) return Left.create(new UserNotExistsError())

        await prisma.user.update({where:{email:email},data:{accountConfirmed:true}})
        return Right.create(undefined)
    }catch(error: any){
      return Left.create(new ErrorBase(error.message, 500));
    }
  }
  
}
