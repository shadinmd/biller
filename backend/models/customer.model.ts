import mongoose from "mongoose";
import CustomerInterface from "types/customer.interface";

const customerSchema = new mongoose.Schema<CustomerInterface>({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	point: {
		type: Number,
		default: 0
	},
	shop: {
		type: String,
		required: true,
		ref: "Shop"
	}
}, { timestamps: true })

const CustomerModel = mongoose.model("Customer", customerSchema)
export default CustomerModel
