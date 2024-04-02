import { NextFunction, Request, Response } from "express"
import { handle500ServerError } from "../lib/error.handlers"
import { decodeToken } from "../lib/auth"
import VendorModel from "../models/vendor.model"
import StaffModel from "../models/staff.model"

type userTypes = "admin" | "staff" | "vendor" | "manager"

const authorizationMiddleware = (...types: userTypes[]): (req: Request, res: Response, next: NextFunction) => void => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token = req.headers.authorization

			if (!token) {
				res.status(400).send({
					success: false,
					message: "unauthorized",
					error: "unauthorized",
				})
				return
			}

			const payload = decodeToken(token) as { type: userTypes, id: string }

			if (!payload) {
				res.status(400).send({
					success: false,
					message: "the provided token is invalid",
					error: "invalidtoken"
				})
				return
			}

			if (!types.includes(payload.type)) {
				res.status(401).send({
					success: false,
					message: "you are un authorized",
					error: "unauthorized",
				})
				return
			}

			if (payload.type == "staff" || payload.type == "manager") {
				const staffSearch = await StaffModel.findById(payload.id)

				if (!staffSearch) {
					res.status(400).send({
						successs: false,
						message: "account not found",
						error: "notfound"
					})
					return
				}

				if (staffSearch.blocked) {
					res.status(400).send({
						success: false,
						message: "your account is blocked",
						error: "blocked"
					})
					return
				}
			}

			if (payload.type == "vendor") {
				const vendorSearch = await VendorModel.findById(payload.id)

				if (!vendorSearch) {
					res.status(400).send({
						success: false,
						message: "account not found",
						error: "notfound"
					})
					return
				}

				if (!vendorSearch.verified) {
					res.status(400).send({
						success: false,
						message: "account not verified",
						error: "unverified"
					})
					return
				}

				if (vendorSearch?.blocked) {
					res.status(400).send({
						success: false,
						message: "this account is blocked",
						error: "blocked"
					})
					return
				}
			}

			next()
		} catch (error) {
			console.log(error)
			handle500ServerError(res)
		}
	}
}

export default authorizationMiddleware
