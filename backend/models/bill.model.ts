import mongoose from "mongoose";
import BillInterface from "types/bill.interface"

const productSchema = new mongoose.Schema({
	product: {
		type: String,
		required: true,
		ref: "Product"
	},
	quantity: {
		type: Number,
		required: true
	}
})

const billSchema = new mongoose.Schema<BillInterface>({
	staff: {
		type: String,
		required: true,
		ref: "Staff"
	},
	shop: {
		type: String,
		required: true,
		ref: "Shop"
	},
	products: [{
		type: productSchema,
	}],
	total: {
		type: Number,
		required: true
	},
	discount: {
		type: Number,
		default: 0
	},
	totalAtfterDiscount: {
		type: Number,
		required: true
	}
}, { timestamps: true })

const BillModel = mongoose.model("Bill", billSchema)
export default BillModel
