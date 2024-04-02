import express from "express"
import {
	adminLogin,
	staffLogin,
	vendorLogin,
	vendorRegister,
	vendorVerify,
	vendorForgot,
	vendorSendOtp
} from "../controllers/auth.controller"
const authRouter = express.Router()

authRouter.post("/vendor/login", vendorLogin)
authRouter.post("/vendor/verify", vendorVerify)
authRouter.post("/vendor/sendOtp", vendorSendOtp)
authRouter.post("/vendor/forgot", vendorForgot)
authRouter.post("/vendor/register", vendorRegister)

authRouter.post("/staff/login", staffLogin)

authRouter.post("/admin/login", adminLogin)

export default authRouter
