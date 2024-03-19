import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import BillModel from "../models/bill.model"

export const createBill = async (req: Request, res: Response) => {
	try {
		const {
			staff,
			shop,
			total,
			discount,
			totalAtfterDiscount,
			products
		} = req.body

		console.log({
			staff,
			shop,
			total,
			discount,
			totalAtfterDiscount
		})

		if (
			!staff ||
			!shop ||
			typeof total == "undefined" ||
			typeof discount == "undefined" ||
			typeof totalAtfterDiscount == "undefined"
		) {
			res.status(400).send({
				success: false,
				message: "required fields not provided"
			})
			return
		}

		const newBill = await new BillModel({
			staff,
			shop,
			total,
			discount,
			products,
			totalAtfterDiscount
		}).save()

		res.status(200).send({
			success: true,
			message: "bill is created successfully",
			bill: newBill
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
export const getBillsByShop = async (req: Request, res: Response) => {
	try {

		const { id } = req.params
		console.log(id)

		if (!id) {
			res.status(400).send({
				success: false,
				message: "shop id not provided"
			})
			return
		}

		const bills = await BillModel.find({ shop: id })

		res.status(200).send({
			success: true,
			message: "bills fetched successfully",
			bills
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
export const getBillsByStaff = (req: Request, res: Response) => {
	try {


	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const deleteBillById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		if (!id) {
			res.status(400).send({
				success: false,
				message: "id not provided"
			})
			return
		}

		await BillModel.deleteOne({ _id: id })

		res.status(200).send({
			success: true,
			message: "bill deleted successfully"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getBillDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		if (!id) {
			res.status(400).send({
				success: false,
				message: "id not provided"
			})
			return
		}

		const bill = await BillModel.findById(id)

		res.status(200).send({
			success: true,
			message: "bill details fetched successfully",
			bill
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
