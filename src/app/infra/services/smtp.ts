import { Either, Left, Right } from "../../core/errors/either";
import { ErrorBase } from "../../core/errors/errorBase";
import nodemailer from "nodemailer";
import { SMTPInterface } from "../../data/interfaces/smtp";
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER , EMAIL_TO_SEND} from "../../../config";





export class SMTP implements SMTPInterface {
  private transporter: nodemailer.Transporter;

  constructor() {
        if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_TO_SEND) {
            throw new Error("SMTP configuration missing");
        }

        this.transporter = nodemailer.createTransport({
            host:SMTP_HOST,
            port:Number(SMTP_PORT),
            auth:{
                user:SMTP_USER,
                pass:SMTP_PASS
            }
        });
  }

  async sendConfirmationEmail(to: string, confirmationToken: string): Promise<Either<ErrorBase, void>> {
        const mailOptions: nodemailer.SendMailOptions = {
        from: EMAIL_TO_SEND,
        to: to,
        subject: "Confirmação de Email",
        html: `
            <html>
            <head>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                }
                h1 {
                    color: #007bff;
                }
                </style>
            </head>
            <body>
                <h1>Confirmação de Email</h1>
                <p>Clique no link a seguir para confirmar seu email:</p>
                <p><a href="${confirmationToken}">$Confirmar</a></p>
            </body>
            </html>
      `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return Right.create(undefined); 
        } catch (error:any) {
            return Left.create(new ErrorBase(error.message,500)); // Se houver um erro, retornamos um Either contendo o erro
        }
  }
}
