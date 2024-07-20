import { NextApiResponse } from "next"
import nodemailer from "nodemailer"

export async function sendEmailVerification(email: string, token: string) {
  const htmlPage = `
    <a href="${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}"> Click here to verify </a>
  `

  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "emanuelfelipe9230@gmail.com",
        pass: "mrem dmwa hxbf dxvo"
      }
    })

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Next Auth App" <nextapp@app.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your email ✔", // Subject line
      text: "Hello world?", // plain text body
      html: htmlPage // html body
    })
  } catch (error) {
    console.log(error)
  }
}
