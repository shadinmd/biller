import { Router } from "express";
import { createStaff, getAllStaffsByshop } from "../controllers/staff.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const staffRouter = Router()

staffRouter.route("/")
	.post(authorizationMiddleware("vendor", "staff"), createStaff)

staffRouter.route("/:id")
	.get(authorizationMiddleware("vendor", "staff"), getAllStaffsByshop)

export default staffRouter
