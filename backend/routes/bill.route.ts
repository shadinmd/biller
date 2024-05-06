import { Router } from "express";
import {
	createBill,
	deleteBillById,
	getBillDetails,
	getBillsByShop,
	getBillsByStaff,
	getNumofBillsbyshop,
	getBillCountByVendor,
	getBillAnalytics,
	getBillCountByShop,
	editBill
} from "../controllers/bill.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const billRouter = Router()

billRouter.route("/")
	.post(authorizationMiddleware("staff", "vendor", "manager"), createBill)

billRouter.get("/shop/no/:id", authorizationMiddleware("manager", "vendor", "staff"), getNumofBillsbyshop)
billRouter.get("/staff/no/:id", authorizationMiddleware("manager", "vendor", "staff"), getNumofBillsbyshop)

billRouter.route("/shop/:id")
	.get(authorizationMiddleware("staff", "vendor", "manager"), getBillsByShop)

billRouter.route("/shop/:id/count")
	.get(authorizationMiddleware("staff", "vendor", "manager", "admin"), getBillCountByShop)


billRouter.get("/analytics", authorizationMiddleware("admin"), getBillAnalytics)

billRouter.route("/vendor/count")
	.get(authorizationMiddleware("vendor"), getBillCountByVendor)

billRouter.route("/staff/:id")
	.get(authorizationMiddleware("staff", "vendor", "manager"), getBillsByStaff)

billRouter.route("/:id")
	.get(authorizationMiddleware("manager", "vendor", "staff"), getBillDetails)
	.put(authorizationMiddleware("vendor", "manager"), editBill)
	.delete(authorizationMiddleware("manager", "vendor", "staff"), deleteBillById)

export default billRouter
