import { Request, Response } from "express"
import { handle500ServerError } from "../libs/error.handlers"
import AdminModel from "../models/admin.model"
import jwt from "jsonwebtoken"
import VendorModel from "../models/vendor.model"
import { hashPass } from "../libs/password"

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

		const payload = {
			id: adminSearch._id,
			admin: true
		}

		const token = jwt.sign(payload, process.env.JWT_SECRET as string)

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

export const vendorLogin = (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

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

		const hashedPassword = hashPass(password)

		await new VendorModel({
			username,
			password: hashedPassword,
			email
		}).save()

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const staffLogin = (req: Request, res: Response) => {
	try {
		const { username, password, shopId } = req.body

		if (!username || !password || !shopId) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})

			return
		}

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
