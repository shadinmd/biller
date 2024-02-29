import express from "express"
import { getVendors } from "../controllers/admin.controller"
const adminRouter = express.Router()

adminRouter.route("/vendors")
	.get(getVendors)

export default adminRouter
