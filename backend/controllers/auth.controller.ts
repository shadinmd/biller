import { Request, Response } from "express"
import { handle500ServerError } from "../libs/error.handlers"
import AdminModel from "../models/admin.model"
import jwt from "jsonwebtoken"

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

export const vendorRegister = (req: Request, res: Response) => {
	try {
		const { } = req.body

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const staffLogin = (req: Request, res: Response) => {
	try {
		const { username, password, shopId } = req.body

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
