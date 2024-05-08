import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import adminRouter from "./routes/admin.route"
import authRouter from "./routes/auth.route"
import vendorRouter from "./routes/vendor.route"
import connectDb from "./configs/database"
import planRouter from "./routes/plan.route"
import staffRouter from "./routes/staff.route"
import shopRouter from "./routes/shop.route"
import productRouter from "./routes/product.route"
import billRouter from "./routes/bill.route"
import subscriptionRoute from "./routes/subscription.route"
import customerRoute from "./routes/customer.route"
import startCron from "./lib/cron"

dotenv.config()
const app = express()

connectDb()
startCron()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
	origin: [process.env.FRONT_URL!, "tauri://localhost"]
}))

app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/vendor", vendorRouter)
app.use("/api/plan", planRouter)
app.use("/api/staff", staffRouter)
app.use("/api/shop", shopRouter)
app.use("/api/product", productRouter)
app.use("/api/bill", billRouter)
app.use("/api/subscribe", subscriptionRoute)
app.use("/api/customer", customerRoute)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`server listening http://localhost:${PORT}`)
})
