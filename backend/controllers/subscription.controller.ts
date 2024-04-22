import { Request, Response } from "express"
import { decodeToken } from "../lib/auth"
import VendorModel from "../models/vendor.model"
import PlanModel from "../models/plan.model"
import SubscriptionModel from "../models/subscription.model"
import { handle500ServerError } from "../lib/error.handlers"
import { createPaymentSessions, getPaymentDetials } from "../lib/payment"

export const getCheckoutSession = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization
		const payload = decodeToken(token!) as { id: string }
		const { planId, startDate, expiryDate } = req.body

		const vendor = await VendorModel.findById(payload.id)
		const plan = await PlanModel.findById(planId)

		if (!planId || !startDate || !expiryDate) {
			res.status(400).send({
				success: false,
				message: "please provide all fields"
			})
			return
		}

		if (!vendor) {
			res.status(400).send({
				success: false,
				message: "account not found"
			})
			return
		}

		if (!plan) {
			res.status(400).send({
				success: false,
				message: "plan not found"
			})
			return
		}

		const session = await createPaymentSessions(planId, vendor, plan)
		if (!session) {
			throw new Error("failed to create checkout")
		}

		res.status(200).send({
			success: true,
			message: "subscription created successfully",
			session
		})
		console.log(session)

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const confirmPayment = async (req: Request, res: Response) => {
	try {
		const { sessionId, planId, vendorId } = req.query
		console.log(sessionId, planId, vendorId)

		const FRONT_URL = process.env.FRONT_URL

		if (!planId) {
			res.redirect(`${FRONT_URL}/payment-failed?message=plan%20id%20not%20provided`)
			return
		}

		if (!vendorId) {
			res.redirect(`${FRONT_URL}/payment-failed?message=vendor%20id%20not%20provided`)
			return
		}

		const plan = await PlanModel.findById(planId)
		const vendor = await VendorModel.findById(vendorId)

		if (!plan) {
			res.redirect(`${FRONT_URL}/payment-failed?message=failed%20to%20fetch%20plan%20details`)
			return
		}

		if (!vendor) {
			res.redirect(`${FRONT_URL}/payment-failed?message=failed%20to%20fetch%20plan%20details`)
			return
		}

		const session = await getPaymentDetials(sessionId as string)

		if (session?.payment_status == "unpaid") {
			res.redirect(`${FRONT_URL}/payment-failed?message=payment%20has%20not%20been%20completed`)
			return
		}

		const startDate = new Date(Date.now())
		const expiryDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate())

		const response = await VendorModel.updateOne(
			{
				_id: vendorId
			},
			{
				$set: {
					planExpiry: expiryDate,
					activePlan: planId,
					subscribed: true
				}
			}
		)

		if (response.modifiedCount < 0) {
			res.redirect(`${FRONT_URL}/payment-failed?message=failed%20to%20update%20user%20subscription%20`)
			return
		}

		const subscription = new SubscriptionModel({
			vendor: vendorId,
			plan: planId,
			price: (plan.price - plan.discount),
			startDate,
			expiryDate,
		})

		subscription.save()

		res.status(200).redirect(`${FRONT_URL}/payment-success`)
	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getAnalytics = async (req: Request, res: Response) => {
	try {

		const date = new Date()
		date.setDate(date.getDate() - 5)
		const data = await SubscriptionModel.aggregate([
			{ $match: { createdAt: { $gt: date } } },
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					count: { $sum: 1 }
				}
			},
			{ $sort: { _id: 1 } }
		])

		res.status(200).send({
			success: true,
			message: "fetched subscription analytics",
			data
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const getSubsCount = async (_req: Request, res: Response) => {
	try {

		const subs = await SubscriptionModel.countDocuments({})

		res.status(200).send({
			success: true,
			message: "successfully fetched subs count",
			subs
		})

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
