import mongoose from "mongoose";
import ShopInterface from "types/shop.interface"

const shopSchema = new mongoose.Schema<ShopInterface>({
	name: {
		type: String,
		required: true
	},
	vendor: {
		type: String,
		required: true,
		ref: "Vendor"
	},
	location: {
		type: String
	},
	active: {
		type: Boolean,
		default: true
	},
	image: {
		type: String
	}
}, { timestamps: true })
const shopModel = mongoose.model("Shop", shopSchema)
export default shopModel
