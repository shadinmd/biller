import { Request, Response } from "express";
import { handle500ServerError } from "../libs/error.handlers";
import VendorModel from "../models/vendor.model";

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
