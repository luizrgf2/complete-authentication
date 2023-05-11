import { SMTP } from "./smtp"

describe("SMTP tests", function(){
    it("should be able send email confirmation to user", async function(){
        const sut = new SMTP()
        const res = await sut.sendConfirmationEmail("luizrgfellipe@gmail.com","validtoken")
        expect(res.left).toBeUndefined()
    })
}) 