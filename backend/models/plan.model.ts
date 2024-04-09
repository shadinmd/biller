import mongoose from "mongoose";
import PlanInterface from "types/plan.interface"

const planSchema = new mongoose.Schema<PlanInterface>({
	name: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	discount: {
		type: Number,
		default: 0
	},
	active: {
		type: Boolean,
		default: true
	},
	features: {
		type: [String],
		default: []
	},
	productLimit: {
		type: Number,
		required: true
	},
	billLimit: {
		type: Number,
		required: true
	},
}, { timestamps: true })

const PlanModel = mongoose.model("Plan", planSchema)
export default PlanModel
