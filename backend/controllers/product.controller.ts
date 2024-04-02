import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import ProductModel from "../models/product.model"
import BillModel from "../models/bill.model"

export const createProduct = async (req: Request, res: Response) => {
	try {
		const { name, shopId, price, barcode, profit, point } = req.body

		if (!name ||
			!shopId ||
			typeof price != "number" ||
			!barcode ||
			typeof profit != "number" ||
			typeof point != "number"
		) {
			res.status(400).send({
				success: false,
				message: "please fill all fields",
			})
			return
		}

		const newProduct = await new ProductModel({
			name,
			shop: shopId,
			price,
			profit,
			barcode,
			point
		}).save()

		res.status(200).send({
			success: true,
			message: "product created successfully",
			product: newProduct
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getProductDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const product = await ProductModel.findById(id)

		if (!product) {
			res.status(400).send({
				success: false,
				message: "no product found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "product details fetched",
			product
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getAllProductsbyShop = async (req: Request, res: Response) => {
	try {

		const { id } = req.params
		const { name } = req.query

		if (!id) {
			res.status(400).send({
				success: false,
				message: "id not provided"
			})
			return
		}

		const query = {
			name: {
				$regex: name || "",
				$options: "i"
			},
			shop: id
		}

		const products = await ProductModel.find(query)

		res.status(200).send({
			success: true,
			message: "products fetched successfully",
			products
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const deleteProductById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		if (!id) {
			res.status(400).send({
				scuccess: false,
				message: "id not provided"
			})
			return
		}

		await ProductModel.deleteOne({ _id: id })

		res.status(200).send({
			success: true,
			message: "product deleted successfully"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const editProductDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { name, price, stock, profit, point } = req.body

		if (
			!name ||
			typeof price != "number" ||
			typeof stock != "number" ||
			typeof profit != "number" ||
			typeof point != "number"
		) {
			res.status(400).send({
				success: false,
				message: ""
			})
			return
		}

		await ProductModel.updateOne({ _id: id }, {
			$set: {
				name,
				price,
				stock,
				profit,
				point
			}
		})

		res.status(200).send({
			success: true,
			message: "product details updated"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const editProdutctListing = async (req: Request, res: Response) => {
	try {

		const { id } = req.params
		const { listed } = req.body

		if (!id || typeof listed != "boolean") {
			res.status(400).send({
				success: false,
				message: "id not provided"
			})
			return
		}

		await ProductModel.updateOne({ _id: id }, { $set: { listed } })

		res.status(200).send({
			success: true,
			message: "product listing changed successfully"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getAllListedProductsbyShop = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { name, barcode } = req.query

		if (barcode) {
			const product = await ProductModel.findOne({ barcode, shop: id, listed: true })

			res.status(200).send({
				success: true,
				message: "products fetched by barcode",
				product
			})
			return
		}

		const query = {
			name: {
				$regex: name || "",
				$options: "i"
			},
			listed: true,
			shop: id
		}

		const products = await ProductModel.find(query)

		res.status(200).send({
			success: true,
			message: "product fetched successfully",
			products
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getProductAnalytics = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		const date = new Date()
		date.setDate(date.getDate() - 5)

		const data = await BillModel.aggregate([
			{ $unwind: '$products' },
			{ $match: { 'products.product': id, createdAt: { $gt: date } } },
			{
				$group: {
					_id: {
						date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
						product: '$products.product'
					},
					quantity: { $sum: '$products.quantity' }
				}
			},
			{ $match: { '_id.product': id } },
			{ $project: { _id: 0, date: '$_id.date', quantity: 1 } },
			{ $sort: { date: 1 } }
		])

		console.log(data)

		res.status(200).send({
			success: true,
			message: "fetched prodcut analytics successfully",
			data
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
