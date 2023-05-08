import { Either } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";

export interface BcryptInterface {
    hash(password: string): Promise<Either<ErrorBase, string>>;
    compare(password: string,hash: string): Promise<Either<ErrorBase, boolean>>;
  }