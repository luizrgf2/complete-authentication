import { Either, Right } from "../../src/app/core/errors/either";
import { ErrorBase } from "../../src/app/core/errors/errorBase";
import { SMTPInterface } from "../../src/app/data/interfaces/smtp";

export class SMTPInMemory implements SMTPInterface{
    async sendConfirmationEmail(from: string, confirmationToken: string) : Promise<Either<ErrorBase, void>>{
        return Right.create(undefined)
    }

}