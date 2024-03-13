import mongoose from "mongoose"

export const generateRandomString = (): string => {
	return new mongoose.Types.ObjectId().toHexString()
}
