import mongoose from "mongoose"
import staffInterface from "types/staff.interface"

const staffSchema = new mongoose.Schema<staffInterface>({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	shop: {
		type: String,
		required: true
	},
	manager: {
		type: Boolean,
		default: false
	},
	blocked: {
		type: Boolean,
		default: false
	}
})

const StaffModel = mongoose.model("Staff", staffSchema)
export default StaffModel
