import mongoose from "mongoose";

const connectDb = async () => {
	try {
		const DBURL = process.env.DBURL
		if (!DBURL) {
			throw new Error("DBURL empty")
		}
		const connection = await mongoose.connect(DBURL)
	} catch (error) {
		console.log(error)
	}
}

export default connectDb
