import nodeMailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodeMailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS
	}
})

export const sendOtpMail = (to: string, url: string) => {
	transporter.sendMail({
		from: process.env.EMAIL,
		to,
		subject: "Biller: verification email",
		text: `Thank you for registering with biller

				please click the link below to verify your account
				${url}

				If you didn't register in biller you can ignore this mail

				regards,
				biller team
`
	})
}

export const sendResetMail = (to: string) => {

	transporter.sendMail({
		from: process.env.EMAIL,
		to,
		subject: "Biller: email for resetting your password",
		text: ``
	})
}
