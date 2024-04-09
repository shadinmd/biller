import { Router } from "express";
import {
	getCheckoutSession,
	confirmPayment,
	getAnalytics,
	getSubsCount
} from "../controllers/subscription.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const subscriptionRoute = Router()

subscriptionRoute.route("/")
	.post(authorizationMiddleware("vendor"), getCheckoutSession)

subscriptionRoute.get("/count", authorizationMiddleware("admin"), getSubsCount)
subscriptionRoute.get("/analytics", authorizationMiddleware("admin"), getAnalytics)
subscriptionRoute.get("/confirmPayment", confirmPayment)

export default subscriptionRoute
