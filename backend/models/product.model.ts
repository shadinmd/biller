import mongoose from "mongoose";
import ProductInterface from "types/product.interface"

const productSchema = new mongoose.Schema<ProductInterface>({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	brand: {
		type: String
	},
	listed: {
		type: Boolean,
		default: true
	},
	shop: {
		type: String,
		required: true,
		ref: "Shop"
	},
	price: {
		type: Number,
		required: true
	},
	stock: {
		type: Number,
		default: 0
	},
	sold: {
		type: Number,
		default: 0
	},
	barcode: {
		type: String,
		required: true
	},
	profit: {
		type: Number,
		required: true
	}
}, { timestamps: true })

const ProductModel = mongoose.model("Product", productSchema)
export default ProductModel
