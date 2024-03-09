import express, { Router } from "express"
import { createPlan, blockVendor, editPlan, getAllPlans, getPlanDetails, getVendorDetails, getVendors } from "../controllers/admin.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"
const adminRouter = express.Router()

const vendorRouter = Router()
const planRouter = Router()

vendorRouter.get("/", authorizationMiddleware("admin"), getVendors)
vendorRouter.post("/block", authorizationMiddleware("admin"), blockVendor)

vendorRouter.route("/:id")
	.get(authorizationMiddleware("admin"), getVendorDetails)

planRouter.route("/")
	.get(authorizationMiddleware("admin"), getAllPlans)
	.post(authorizationMiddleware("admin"), createPlan)

planRouter.route("/:id")
	.get(authorizationMiddleware("admin"), getPlanDetails)
	.put(authorizationMiddleware("admin"), editPlan)

adminRouter.use("/vendor", vendorRouter)
adminRouter.use("/plan", planRouter)
export default adminRouter
