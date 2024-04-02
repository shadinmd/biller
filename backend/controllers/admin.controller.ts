import { Request, Response } from "express";
import { handle500ServerError } from "../lib/error.handlers";
import VendorModel from "../models/vendor.model";
import PlanModel from "../models/plan.model";

export const getVendors = async (_req: Request, res: Response) => {
	try {
		const vendors = await VendorModel.find()

		res.status(200).send({
			success: true,
			message: "vendors fetched successfully",
			vendors
		})
	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getVendorDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		if (!id) {
			res.status(400).send({
				success: false,
				message: "id not provided"
			})

			return
		}

		const vendor = await VendorModel.findOne({ _id: id })

		if (!vendor) {
			res.status(400).send({
				success: false,
				message: "vendor not found"
			})

			return
		}

		res.status(200).send({
			success: true,
			message: "vendor details fetched successfully",
			vendor
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const blockVendor = async (req: Request, res: Response) => {
	try {
		const { id, blocked } = req.body

		if (!id) {
			res.status(400).send({
				scucess: false,
				message: "id not provided"
			})
		}

		const update = await VendorModel.updateOne({ _id: id }, { $set: { blocked } })

		if (update.matchedCount != 1) {
			res.status(400).send({
				success: false,
				message: "user not found"
			})
			return
		}

		res.status(200).send({
			success: true,
			message: blocked ? "vendor blocked successfully" : "vendor un blocked successfully"
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getAllPlans = async (_req: Request, res: Response) => {
	try {
		const plans = await PlanModel.find()

		res.status(200).send({
			success: true,
			message: "successfully fetched plasn",
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
			res.status(200).send({
				success: false,
				message: "id not provided"
			})
			return
		}

		const plan = await PlanModel.findOne({ _id: id })

		if (!plan) {
			res.status(404).send({
				success: false,
				message: "no plan found"
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

export const createPlan = async (req: Request, res: Response) => {
	try {
		const {
			name,
			description,
			price,
			discount,
			active,
			features,
			productLimit,
			billLimit,
			shopLimit
		} = req.body

		if (
			!name ||
			!description ||
			typeof price != "number" ||
			typeof productLimit != "number" ||
			typeof shopLimit != "number" ||
			typeof billLimit != "number"
		) {
			res.status(400).send({
				success: false,
				message: "plese fil all fields"
			})
			return
		}

		const planSearch = await PlanModel.findOne({ name })
		if (planSearch) {
			res.status(400).send({
				success: false,
				message: "a plan with this name all ready exists"
			})
			return
		}

		const newPlan = await new PlanModel({
			name,
			description,
			price,
			discount,
			active,
			features,
			productLimit,
			billLimit,
			shopLimit
		}).save()

		res.status(200).send({
			success: true,
			message: "plan created successfully",
			plan: newPlan
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const editPlan = async (req: Request, res: Response) => {
	try {
		const { _id, name, description, price, discount, active, productLimit, staffLimit, shopLimit } = req.body

		await PlanModel.updateOne({ _id }, { $set: { name, description, price, discount, active, productLimit, staffLimit, shopLimit } })

		res.status(200).send({
			success: true,
			message: "plan updated successfully"
		})


	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const deletePlan = async () => {

}
