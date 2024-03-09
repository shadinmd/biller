import { NextFunction, Request, Response } from "express"
import { handle500ServerError } from "../libs/error.handlers"
import { decodeToken } from "../libs/auth"

type userTypes = "admin" | "staff" | "vendor" | "manager"

const authorizationMiddleware = (...types: userTypes[]): (req: Request, res: Response, next: NextFunction) => void => {
	return (req: Request, res: Response, next: NextFunction) => {
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
					types
				})
				return
			}

			next()
		} catch (error) {
			console.log(error)
			handle500ServerError(res)
		}
	}
}

export default authorizationMiddleware
