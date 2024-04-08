import { Router } from "express";
import authorizationMiddleware from "../middlewares/authorization.middleware";
import {
	createProduct,
	deleteProductById,
	getAllProductsbyShop,
	getProductDetails,
	editProductDetails,
	editProdutctListing,
	getAllListedProductsbyShop,
	getProductAnalytics
} from "../controllers/product.controller";
import { upload } from "../lib/multer";

const productRouter = Router()

productRouter.route("/")
	.post(authorizationMiddleware("staff", "vendor", "manager"), upload.single("file"), createProduct)

productRouter.route("/shop/:id")
	.get(authorizationMiddleware("staff", "vendor", "manager"), getAllProductsbyShop)

productRouter.get("/shop/listed/:id", authorizationMiddleware("staff", "vendor", "manager"), getAllListedProductsbyShop)

productRouter.route("/list/:id")
	.put(authorizationMiddleware("staff", "vendor", "manager"), editProdutctListing)

productRouter
	.get(
		"/:id/analytics", authorizationMiddleware("staff", "manager", "vendor"),
		getProductAnalytics
	)

productRouter.route("/:id")
	.get(authorizationMiddleware("staff", "vendor", "manager"), getProductDetails)
	.delete(authorizationMiddleware("staff", "vendor", "manager"), deleteProductById)
	.put(authorizationMiddleware("staff", "vendor", "manager"), upload.single("file"), editProductDetails)

export default productRouter
