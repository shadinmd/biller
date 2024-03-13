import { Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import ProductModel from "../models/product.model"

export const createProduct = async (req: Request, res: Response) => {
	try {
		const { name, shopId, price, barcode, profit } = req.body

		if (!name || !shopId || !price || !barcode || !profit) {
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
			barcode
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

export const getAllProductsbyShop = async (req: Request, res: Response) => {
	try {

		const { id } = req.params

		if (!id) {
			res.status(400).send({
				success: false,
				message: "id not provided"
			})
			return
		}

		const products = await ProductModel.find({ shop: id })

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
