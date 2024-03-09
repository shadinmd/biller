import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"

export const hashPass = (password: string): string => {
	const salt = bcrypt.genSaltSync(10)
	return bcrypt.hashSync(password, salt)
}

export const comparePass = (password: string, hashedPass: string): boolean => {
	return bcrypt.compareSync(password, hashedPass)
}

export const createToken = (payload: JwtPayload | string): string => {
	const jwtSecret = process.env.JWT_SECRET

	if (!jwtSecret) {
		throw new Error("JWT_SECRET was not found in .env")
	}

	return jwt.sign(payload, jwtSecret)
}

export const decodeToken = (token: string) => {
	const jwtSecret = process.env.JWT_SECRET

	if (!jwtSecret) {
		throw new Error("JWT_SECRET was not found in .env")
	}

	return jwt.verify(token, jwtSecret)
}
