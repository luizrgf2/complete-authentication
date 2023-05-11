import dotenv from 'dotenv'

dotenv.config()

export const {
    JWT_KEY,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_PASS,
    SMTP_USER,
    EMAIL_TO_SEND
} = process.env