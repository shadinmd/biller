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
	shop: {
		type: String,
		ref: "Shop"
	},
	verified: {
		type: Boolean,
		default: false
	},
	verificationToken: {
		type: String,
		required: true
	},
	verificationExpiry: {
		type: Date,
		required: true
	},
	activePlan: {
		type: String,
		ref: "Plan"
	},
	planExpiry: {
		type: Date,
		default: new Date()
	},
	active: {
		type: Boolean,
		default: true
	},
	subscribed: {
		type: Boolean,
		default: false
	},
	blocked: {
		type: Boolean,
		default: false
	},
	deleted: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

const VendorModel = mongoose.model("Vendor", vendorSchema)
export default VendorModel
