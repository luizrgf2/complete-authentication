import jwt from 'jsonwebtoken';
import { Either, Left, Right } from '../../core/errors/either';
import { ErrorBase } from '../../core/errors/errorBase';
import { JWTInterface } from '../../data/interfaces/jwt';
import { JWT_KEY } from '../../../config';

export class JWT implements JWTInterface {
  private secretKey: string;

  constructor() {
    if(!JWT_KEY) throw new Error("JWT_KEY not is empty!")
    this.secretKey = JWT_KEY;
  }

  encode(dataToEncode: any, tokenDurationInMilliseconds: number): Either<ErrorBase, string> {
    try {
      const token = jwt.sign(dataToEncode, this.secretKey, { expiresIn: tokenDurationInMilliseconds / 1000 });
      return Right.create(token);
    } catch (error:any) {
      return Left.create(new ErrorBase(error.message, 500)); // or create a custom error type if needed
    }
  }

  decode<T = any>(token: string): Either<ErrorBase, T> {
    try {
      const decodedData = jwt.verify(token, this.secretKey) as T;
      return Right.create(decodedData);
    } catch (error:any) {
      return Left.create(new ErrorBase(error.message, 401)); // or create a custom error type if needed
    }
  }
}
