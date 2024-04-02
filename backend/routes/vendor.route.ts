import express from "express"
import authorizationMiddleware from "../middlewares/authorization.middleware"
import {
	getCurrentVendorDetails,
	resetPass,
	getDataforDash
} from "../controllers/vendor.controller"
const vendorRouter = express.Router()

vendorRouter.route("/")
	.get(authorizationMiddleware("vendor"), getCurrentVendorDetails)

vendorRouter.get("/dashboard", authorizationMiddleware("vendor"), getDataforDash)

vendorRouter.route("/resetPass")
	.put(authorizationMiddleware("vendor"), resetPass)

export default vendorRouter
