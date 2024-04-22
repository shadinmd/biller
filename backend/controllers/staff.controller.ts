import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import StaffModel from "../models/staff.model"
import { decodeToken, hashPass } from "../lib/auth"

export const createStaff = async (req: Request, res: Response) => {
	try {
		const { shopId, username, password, manager } = req.body

		if (!shopId || !username || !password) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})
			return
		}

		const staffSearch = await StaffModel.findOne({ shop: shopId, username })

		if (staffSearch) {
			res.status(400).send({
				success: false,
				message: "staff with this username allready exist"
			})
			return
		}

		const hashedPass = hashPass(password)

		const newStaff = await new StaffModel({
			shop: shopId,
			username,
			password: hashedPass,
			manager: manager ? true : false
		}).save()

		res.status(200).send({
			success: true,
			message: "staff created successfully",
			staff: newStaff
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getStaffDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const staff = await StaffModel.findById(id).select("-password")

		if (!staff) {
			res.status(400).send({
				success: false,
				message: "staff not found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "staff details fetched",
			staff
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getAllStaffsByshop = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { name } = req.query

		const query = {
			username: {
				$regex: name || "",
				$options: "i"
			},
			shop: id
		}

		const staffs = await StaffModel.find(query, { password: false })

		res.status(200).send({
			success: true,
			message: "fetched staffs successfully",
			staffs
		})
	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getCurrentStaffDetails = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization
		const payload = decodeToken(token!) as { id: string }

		const staff = await StaffModel.findById(payload.id).populate({
			path: 'shop',
			populate: {
				path: 'vendor',
			},
		})

		res.status(200).send({
			success: true,
			message: "current staff details fetched successfully",
			staff
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const blockStaff = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { blocked } = req.body
		console.log(id, blocked)

		if (!id || typeof blocked != "boolean") {
			res.status(400).send({
				success: false,
				message: "required data not provided"
			})
			return
		}

		const result = await StaffModel.updateOne({ _id: id }, { $set: { blocked } })

		if (result.matchedCount < 0) {
			res.status(400).send({
				success: false,
				message: "staff not found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "staff status changed"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const resetStaffPassword = async (req: Request, res: Response) => {
	try {

		const { id } = req.params
		const { password } = req.body

		if (!id || !password) {
			res.status(400).send({
				success: false,
				message: "required data not provided"
			})
			return
		}

		const hashedPass = hashPass(password)
		const result = await StaffModel.updateOne({ _id: id }, { $set: { password: hashedPass } })

		if (result.matchedCount < 0) {
			res.status(400).send({
				success: false,
				message: "staff not found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "staff password changed"
		})
	} catch (error) {
		handle500ServerError(res)
	}
}

export const changeManagerStatus = async (req: Request, res: Response) => {
	try {

		const { id } = req.params
		const { manager } = req.body

		if (!id || typeof manager != "boolean") {
			res.status(400).send({
				success: false,
				message: "required data not provided"
			})
			return
		}

		const result = await StaffModel.updateOne({ _id: id }, { $set: { manager } })
		if (result.matchedCount < 0) {
			res.status(400).send({
				success: false,
				message: "staff not found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: `staff ${manager ? "promoted" : "demoted"}`
		})
	} catch (error) {
		handle500ServerError(res)
	}
}

export const getStaffCount = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const staffs = await StaffModel.countDocuments({ shop: id })

		res.status(200).send({
			success: true,
			message: "successfully fetched staff count",
			staffs
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
