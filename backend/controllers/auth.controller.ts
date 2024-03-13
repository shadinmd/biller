import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import AdminModel from "../models/admin.model"
import VendorModel from "../models/vendor.model"
import { comparePass, createToken, hashPass } from "../lib/auth"
import StaffModel from "../models/staff.model"

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

		const hashedPassword = hashPass(password)

		await new VendorModel({
			username,
			password: hashedPassword,
			email
		}).save()

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
				message: "incorrect username or shopId"
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
			type: "staff"
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
