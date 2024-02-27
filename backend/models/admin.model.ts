import mongoose from "mongoose";
import AdminInterface from "types/admin.interface"

const adminSchema = new mongoose.Schema<AdminInterface>({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, { timestamps: true })

const AdminModel = mongoose.model("Admin", adminSchema)
export default AdminModel
