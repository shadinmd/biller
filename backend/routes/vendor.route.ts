import express from "express"
import authorizationMiddleware from "../middlewares/authorization.middleware"
import {
	getCurrentVendorDetails,
	resetPass,
	getDataforDash,
	getVendorCount
} from "../controllers/vendor.controller"
const vendorRouter = express.Router()

vendorRouter.route("/")
	.get(authorizationMiddleware("vendor"), getCurrentVendorDetails)

vendorRouter.get("/count", authorizationMiddleware("admin"), getVendorCount)

vendorRouter.get("/dashboard", authorizationMiddleware("vendor"), getDataforDash)

vendorRouter.route("/resetPass")
	.put(authorizationMiddleware("vendor"), resetPass)

export default vendorRouter
