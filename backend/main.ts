import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import adminRouter from "./routes/admin.route"
import authRouter from "./routes/auth.route"
import vendorRouter from "./routes/vendor.route"

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
	origin: "*"
}))

app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/vendor", vendorRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`server listening http://localhost:${PORT}`)
})
