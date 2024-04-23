import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import BillModel from "../models/bill.model"
import ProductModel from "../models/product.model"
import shopModel from "../models/shop.model"
import { decodeToken } from "../lib/auth"
import CustomerModel from "../models/customer.model"

export const createBill = async (req: Request, res: Response) => {
	try {
		const {
			staff,
			shop,
			total,
			discount,
			totalAtfterDiscount,
			products,
			customer
		} = req.body

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

		const searchedProducts = await ProductModel.find({
			_id: {
				$in: products.map((e: { product: string }) => e.product)
			}
		})

		const productsMap = new Map(searchedProducts.map((e) => [e._id.toString(), e]))

		let points = 0

		for (const item of products) {
			const { product, quantity, point } = item
			const productDoc = productsMap.get(product)
			points += (quantity * point)

			if (!productDoc || productDoc.stock < quantity) {
				return res.status(400).send({
					success: false,
					message: `not enough stock for product ${productDoc?.name}`,
				})
			}
		}

		for (const item of products) {
			const { product, quantity } = item
			const productDoc = productsMap.get(product)
			productDoc!.stock -= quantity
			productDoc!.sold += quantity
		}


		await Promise.all(searchedProducts.map((e) => e.save()))

		let billDetails = {
			staff,
			shop,
			total,
			discount,
			products,
			totalAtfterDiscount,
			customer: ""
		}

		if (customer) {
			console.log(customer)
			const searchCustomer = await CustomerModel.findOne({})

			if (!searchCustomer) {
				res.status(400).send({
					success: false,
					message: "customer was not found"
				})
				return
			}

			if (discount > 0) {
				if (searchCustomer.point < discount) {
					res.status(400).send({
						success: false,
						message: "customer doesn't have sufficient points"
					})
					return
				}
				searchCustomer.point -= discount
				await searchCustomer.save()
				billDetails.customer = customer
			} else {
				console.log(points)
				searchCustomer.point += points
				await searchCustomer.save()
			}
			billDetails.customer = customer
		}

		const newBill = await new BillModel(billDetails).save()

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

		const bill = await BillModel.findById(id).populate("products.product")

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

export const getNumofBillsbyshop = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const bills = await BillModel.countDocuments({ staff: id })

		res.status(200).send({
			success: true,
			message: "number of bills fetched successfully",
			bills
		})

	} catch (error) {
		handle500ServerError(res)
	}
}

export const getBillCountByVendor = async (req: Request, res: Response) => {
	try {
		const payload = decodeToken(req.headers.authorization!) as { id: string }

		const shops = await shopModel.find({ vendor: payload.id })
		const shopIds = shops.map(e => e._id.toString())

		const count = await BillModel.countDocuments({ shop: { $in: shopIds } })

		res.status(200).send({
			success: true,
			message: "fetched bill count",
			count
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getBillAnalytics = async (req: Request, res: Response) => {
	try {
		const date = new Date()
		date.setDate(date.getDate() - 5)

		const bills = await BillModel.aggregate([
			{ $match: { createdAt: { $gt: date } } },
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

		res.status(200).send({
			success: true,
			messgage: "bill anaytics fetched successfully",
			bills
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getBillCountByShop = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const bills = await BillModel.countDocuments({ shop: id })

		res.status(200).send({
			success: true,
			message: "bill count fetched  successfully",
			bills
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const editBill = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { products } = req.body

		const response = await BillModel.updateOne(
			{ _id: id },
			{
				$set: {
					products
				}
			}
		)

		if (response.matchedCount < 1) {
			res.status(400).send({
				success: false,
				message: "bill was not found"
			})
			return
		}

		if (response.modifiedCount < 1) {
			res.status(400).send({
				success: false,
				message: "failed to update bill"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "bill edited suscessfully"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
