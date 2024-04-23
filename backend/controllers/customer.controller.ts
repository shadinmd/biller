import { Request, Response } from "express";
import { handle500ServerError } from "../lib/error.handlers";
import CustomerModel from "../models/customer.model";
import BillModel from "../models/bill.model";

export const getCustomersByShop = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { name } = req.query

		const query = {
			$or: [
				{
					name: {
						$regex: name || "",
						$options: "i"
					},
					shop: id
				},
				{
					phone: {
						$regex: name || "",
						$options: "i"
					},
					shop: id
				}
			]
		}

		const customers = await CustomerModel.find(query)

		res.status(200).send({
			success: true,
			message: "customer fetched successfully",
			customers
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const createCustomer = async (req: Request, res: Response) => {
	try {
		const { name, phone, shop } = req.body
		console.log(name, phone, shop)

		if (!name || !phone || !shop) {
			res.status(400).send({
				success: false,
				message: "please fill all fields"
			})
			return
		}

		const searchCustomer = await CustomerModel.findOne({
			$or: [
				{ name, shop },
				{ phone, shop }
			]
		})

		if (searchCustomer) {
			res.status(400).send({
				success: false,
				message: "customer name or phone allready in use"
			})
			return
		}

		const customer = await new CustomerModel({
			name,
			phone,
			shop
		}).save()

		res.status(200).send({
			success: true,
			message: "customer created successfully",
			customer
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getCustomerCountByShop = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const customerCount = await CustomerModel.countDocuments({ shop: id })

		res.status(200).send({
			success: true,
			message: "customer count fetched successfully",
			customerCount
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getCustomerDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const customer = await CustomerModel.findById(id)
		const bills = await BillModel.find({ customer: id })

		if (!customer) {
			res.status(404).send({
				success: false,
				message: "customer not found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "customer details fetched successfully",
			customer,
			bills
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
