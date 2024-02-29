import express from "express"
import { adminLogin, staffLogin, vendorLogin, vendorRegister } from "../controllers/auth.controller"
const authRouter = express.Router()

authRouter.post("/vendor/login", vendorLogin)
authRouter.post("/vendor/register", vendorRegister)
authRouter.post("/staff/login", staffLogin)
authRouter.post("/admin/login", adminLogin)

export default authRouter
