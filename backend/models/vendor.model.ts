import mongoose from "mongoose";
import vendorInterface from "types/vendor.interface"

const vendorSchema = new mongoose.Schema<vendorInterface>({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	activePlan: {
		type: String,
		default: ""
	},
	planExpiry: {
		type: Date
	},
	active: {
		type: Boolean,
		default: true
	},
	deleted: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

const VendorModel = mongoose.model("Vendor", vendorSchema)
export default VendorModel
