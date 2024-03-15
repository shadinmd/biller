import { Router } from "express";
import authorizationMiddleware from "../middlewares/authorization.middleware";
import { createProduct, getAllProductsbyShop, getProductDetails } from "../controllers/product.controller";

const productRouter = Router()

productRouter.route("")
	.post(authorizationMiddleware("staff", "vendor"), createProduct)

productRouter.route("/shop/:id")
	.get(authorizationMiddleware("staff", "vendor"), getAllProductsbyShop)

productRouter.route("/:id")
	.get(authorizationMiddleware("staff", "vendor"), getProductDetails)

export default productRouter
