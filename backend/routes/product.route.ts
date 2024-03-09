import { Router } from "express";
import authorizationMiddleware from "../middlewares/authorization.middleware";
import { createProduct, getAllProductsbyShop } from "../controllers/product.controller";

const productRouter = Router()

productRouter.route("")
	.post(authorizationMiddleware("staff", "vendor"), createProduct)

productRouter.route("/:id")
	.get(authorizationMiddleware("staff", "vendor"), getAllProductsbyShop)

export default productRouter
