import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import { decodeToken, hashPass } from "../lib/auth"
import VendorModel from "../models/vendor.model"
import shopModel from "../models/shop.model"
import BillModel from "../models/bill.model"

export const getCurrentVendorDetails = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization
		const payload = decodeToken(token!) as { id: string }

		const vendor = await VendorModel.findById(payload.id)

		res.status(200).send({
			success: true,
			message: "vendor details fetched successfully",
			vendor
		})

	} catch (error) {
		handle500ServerError(res)
	}
}

export const resetPass = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization
		const payload = decodeToken(token!) as { id: string }
		const { password } = req.body

		if (!password) {
			res.status(400).send({
				success: false,
				message: "password not provided"
			})
			return
		}

		const hashedPassword = hashPass(password)

		const response = await VendorModel.updateOne({
			_id: payload.id,
			$set: {
				password: hashedPassword
			}
		})

		if (!response.acknowledged) {
			res.status(400).send({
				success: false,
				message: "failed change password please try again"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "password changed successfully"
		})

	} catch (error) {
		handle500ServerError(res)
	}
}

export const getDataforDash = async (req: Request, res: Response) => {
	try {
		const payload = decodeToken(req.headers.authorization!) as { id: string }

		const shops = await shopModel.find({ vendor: payload.id })
		const date = new Date()
		date.setDate(date.getDay() - 5)

		const shopIds = shops.map(e => e._id.toString())
		const bills = await BillModel.aggregate([
			{ $match: { shop: { $in: shopIds }, createdAt: { $gt: date } } },
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					count: { $sum: 1 }
				}
			},
			{
				$sort: { _id: 1 }
			}
		])

		console.log(shopIds)
		console.log(bills)

		res.status(200).send({
			success: true,
			message: "dashboard data fetched successfully",
			bills
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
