import mongoose from "mongoose";
import SubscriptionInterface from "types/subscription.interface"

const subscriptionSchema = new mongoose.Schema<SubscriptionInterface>({
	vendor: {
		type: String,
		required: true,
		ref: "Vendor"
	},
	plan: {
		type: String,
		required: true,
		ref: "Plan"
	},
	price: {
		type: Number,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	expiryDate: {
		type: Date,
		required: true
	},
}, { timestamps: true })

const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema)
export default SubscriptionModel
