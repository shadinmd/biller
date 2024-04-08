import { v2 as cloudinary } from 'cloudinary'

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET

if (!CLOUDINARY_NAME || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) {
	throw new Error(`Missing env variables`)
}

cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET,
})

export default cloudinary
