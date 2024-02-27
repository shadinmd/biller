import { Request, Response } from "express"
import { handle500ServerError } from "../libs/error.handlers"

export const adminLogin = (req: Request, res: Response) => {
	try {

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const vendorLogin = (req: Request, res: Response) => {
	try {

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const vendorRegister = (req: Request, res: Response) => {
	try {

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}

export const staffLogin = (req: Request, res: Response) => {
	try {

	} catch (error) {
		console.log(error)
		handle500ServerError(res)
	}
}
