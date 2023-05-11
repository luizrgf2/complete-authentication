import { Either, Left, Right } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";
import bcrypt from "bcrypt";
import { BcryptInterface } from "../../data/interfaces/bcrypt";

export class Bcrypt implements BcryptInterface {
  async hash(password: string): Promise<Either<ErrorBase, string>> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return Right.create(hashedPassword);
    } catch (error) {
      return Left.create(new ErrorBase("Error hashing password", 500));
    }
  }

  async compare(password: string, hash: string): Promise<Either<ErrorBase, boolean>> {
    try {
      const result = await bcrypt.compare(password, hash);
      return Right.create(result);
    } catch (error) {
      return Left.create(new ErrorBase("Error comparing passwords", 500));
    }
  }
}
