import VendorModel from "../models/vendor.model";
import cron from "node-cron"

const cronTask = async () => {
	try {
		console.log("cron triggered")
		const date = new Date()
		const response = await VendorModel.updateMany({ planExpiry: { $lt: date }, subscribed: true }, { subscribed: false })
		console.log("cron: matched = ", response.matchedCount)
		console.log("cron: modified = ", response.modifiedCount)
	} catch (error) {
		console.log(error)
	}
}

const startCron = () => {
	cron.schedule("*/5 * * * *", cronTask)
}

export default startCron
