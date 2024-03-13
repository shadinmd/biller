import { Response } from "express";

export const handle500ServerError = (res: Response) => {
	res.status(500).send({
		success: false,
		message: "server error"
	})
}
