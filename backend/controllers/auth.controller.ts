import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import AdminModel from "../models/admin.model"
import VendorModel from "../models/vendor.model"
import { comparePass, createToken, decodeToken, hashPass } from "../lib/auth"
import StaffModel from "../models/staff.model"
import crypto from "node:crypto"
import { sendOtpMail } from "../lib/mailer"
import generateToken from "../lib/generator"

export const adminLogin = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})
			return
		}

		const adminSearch = await AdminModel.findOne({ username })

		if (!adminSearch) {
			res.status(400).send({
				success: false,
				message: `admin ${username} not found`
			})
			return
		}

		if (password != adminSearch.password) {
			res.status(400).send({
				success: false,
				message: `incorrect username or password`
			})
		}

		const token = createToken({
			id: adminSearch._id,
			type: "admin"
		})

		res.status(200).send({
			success: true,
			message: "logged in successfully",
			token
		})


	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const vendorLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		console.log(email, password)

		if (!email || !password) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})
			return
		}

		const vendorSearch = await VendorModel.findOne({ email })

		if (!vendorSearch) {
			res.status(400).send({
				success: false,
				message: "no account found with this email"
			})
			return
		}

		if (vendorSearch.blocked) {
			res.status(400).send({
				success: false,
				message: "this account is blocked"
			})
			return
		}

		const passCheck = comparePass(password, vendorSearch?.password!)

		if (!passCheck) {
			res.status(400).send({
				success: false,
				message: "incorrect email or password"
			})
			return
		}

		const token = createToken({
			id: vendorSearch?._id.toString(),
			type: "vendor"
		})

		res.status(200).send({
			success: true,
			message: "vendor login successfull",
			token
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const vendorRegister = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body

		const vendorSearch = await VendorModel.findOne({ username })

		if (vendorSearch) {

			res.status(400).send({
				success: false,
				message: "email allready in use"
			})

			return
		}

		//@ts-ignore
		const verificationToken = generateToken(email)
		console.log(verificationToken)

		const date = new Date()
		date.setTime(date.getTime() + (5 * 60 * 1000))

		const hashedPassword = hashPass(password)

		await new VendorModel({
			username,
			password: hashedPassword,
			email,
			verificationToken,
			verificationExpiry: date
		}).save()

		const FRONT_URL = process.env.FRONT_URL
		sendOtpMail(email, `${FRONT_URL}/verify?token=${verificationToken}`)

		res.status(200).send({
			success: true,
			message: "vendor registered successfully",
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const staffLogin = async (req: Request, res: Response) => {
	try {
		const { username, password, shopId } = req.body

		if (!username || !password || !shopId) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})

			return
		}

		const staffSearch = await StaffModel.findOne({ username, shop: shopId })

		if (!staffSearch) {
			res.status(400).send({
				success: false,
				message: "could not find staff account"
			})
			return
		}

		const passCheck = comparePass(password, staffSearch.password)

		if (!passCheck) {
			res.status(400).send({
				success: false,
				message: "incorrect password"
			})
			return
		}

		const token = createToken({
			id: staffSearch._id,
			type: staffSearch.manager ? "manager" : "staff"
		})

		res.status(200).send({
			success: true,
			message: "staff login successfull",
			token
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const vendorVerify = async (req: Request, res: Response) => {
	try {
		const { token } = req.body

		if (!token) {
			res.status(400).send({
				success: false,
				message: "token not provided"
			})
			return
		}

		const vendor = await VendorModel.findOne({ verificationToken: token })

		if (!vendor) {
			res.status(400).send({
				success: false,
				message: "user not found"
			})
			return
		}

		const currentTime = new Date()

		if (currentTime > vendor.planExpiry) {
			res.status(400).send({
				successs: false,
				message: "token expired"
			})
			return
		}

		const response = await VendorModel.updateOne({ verificationToken: token }, { $set: { verified: true } })

		if (response.modifiedCount < 0) {
			res.status(500).send({
				success: false,
				message: "failed to updated verification status please try again"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "account verified successfully"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const vendorSendOtp = async (req: Request, res: Response) => {
	try {
		const { email } = req.body

		const vendorSearch = await VendorModel.findOne({ email })

		if (!vendorSearch) {
			res.status(400).send({
				success: false,
				message: "user with this email doesn't exist"
			})
			return
		}

		const date = new Date()
		date.setTime(date.getTime() + (5 * 60 * 1000))

		vendorSearch.verificationExpiry = date
		await vendorSearch.save()

		const FRONT_URL = process.env.FRONT_URL
		sendOtpMail(email, `${FRONT_URL}/verify?token=${vendorSearch.verificationToken}`)

		res.status(200).send({
			success: true,
			message: "email send successfully"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const vendorForgot = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization
		const { id } = decodeToken(token!) as { id: string }
		const { } = req.body


	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
