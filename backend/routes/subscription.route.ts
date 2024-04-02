import { Router } from "express";
import { getCheckoutSession, confirmPayment } from "../controllers/subscription.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const subscriptionRoute = Router()

subscriptionRoute.route("/")
	.post(authorizationMiddleware("vendor"), getCheckoutSession)

subscriptionRoute.get("/confirmPayment", confirmPayment)

export default subscriptionRoute
