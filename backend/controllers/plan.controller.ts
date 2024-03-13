import { handle500ServerError } from "../lib/error.handlers"
import { Request, Response } from "express"
import PlanModel from "../models/plan.model"

export const getAllPlans = async (_req: Request, res: Response) => {
	try {

		const plans = await PlanModel.find({ active: true })

		res.status(200).send({
			success: true,
			message: "plans fetched successfully",
			plans
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getPlanDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		if (!id) {
			res.status(400).send({
				success: false,
				message: "id not provided"
			})
			return
		}

		const plan = await PlanModel.findOne({ _id: id, active: true })

		if (!plan) {
			res.status(404).send({
				success: false,
				message: "plan details not found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: "plan details fetched successfully",
			plan
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
