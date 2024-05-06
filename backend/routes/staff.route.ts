import { Router } from "express";
import {
	createStaff,
	getAllStaffsByshop,
	getStaffDetails,
	getCurrentStaffDetails,
	blockStaff,
	resetStaffPassword,
	changeManagerStatus,
	getStaffCount
} from "../controllers/staff.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const staffRouter = Router()

staffRouter.route("/")
	.post(authorizationMiddleware("vendor", "manager"), createStaff)
	.get(authorizationMiddleware("staff", "manager"), getCurrentStaffDetails)

staffRouter.route("/shop/:id")
	.get(authorizationMiddleware("vendor", "staff", "manager"), getAllStaffsByshop)

staffRouter.route("/shop/:id/count")
	.get(authorizationMiddleware("vendor", "staff", "manager", "admin"), getStaffCount)

staffRouter.route("/manager/:id")
	.put(authorizationMiddleware("vendor", "manager"), changeManagerStatus)

staffRouter.route("/reset/:id")
	.put(authorizationMiddleware("vendor", "manager"), resetStaffPassword)

staffRouter.route("/block/:id")
	.put(authorizationMiddleware("vendor", "manager"), blockStaff)

staffRouter.route("/:id")
	.get(authorizationMiddleware("vendor", "staff", "manager"), getStaffDetails)

export default staffRouter
