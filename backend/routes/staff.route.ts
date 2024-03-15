import { Router } from "express";
import { createStaff, getAllStaffsByshop, getStaffDetails } from "../controllers/staff.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const staffRouter = Router()

staffRouter.route("/")
	.post(authorizationMiddleware("vendor", "staff"), createStaff)

staffRouter.route("/shop/:id")
	.get(authorizationMiddleware("vendor", "staff"), getAllStaffsByshop)

staffRouter.route("/:id")
	.get(authorizationMiddleware("vendor", "staff"), getStaffDetails)

export default staffRouter
