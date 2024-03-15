import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import StaffModel from "../models/staff.model"
import { hashPass } from "../lib/auth"

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

		const staff = await StaffModel.findById(id)

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

		const staffs = await StaffModel.find({ shop: id })

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
