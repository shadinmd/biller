import { Router } from "express";
import { createBill, deleteBillById, getBillDetails, getBillsByShop, getBillsByStaff } from "../controllers/bill.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const billRouter = Router()

billRouter.route("/")
	.post(authorizationMiddleware("staff", "vendor", "manager"), createBill)

billRouter.route("/shop/:id")
	.get(authorizationMiddleware("staff", "vendor", "manager"), getBillsByShop)

billRouter.route("/staff/:id")
	.get(authorizationMiddleware("staff", "vendor", "manager"), getBillsByStaff)

billRouter.route("/:id")
	.get(authorizationMiddleware("manager", "vendor", "staff"), getBillDetails)
	.delete(authorizationMiddleware("manager", "vendor", "staff"), deleteBillById)

export default billRouter
