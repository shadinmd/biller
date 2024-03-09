import { Router } from "express"
import { getAllPlans, getPlanDetails } from "../controllers/plan.controller"
const planRouter = Router()

planRouter.get("/", getAllPlans)
planRouter.get("/:id", getPlanDetails)

export default planRouter
