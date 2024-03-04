import bcrypt from "bcrypt"

export const hashPass = (password: string): string => {
	const salt = bcrypt.genSaltSync(10)
	return bcrypt.hashSync(password, salt)
}

export const comparePass = (password: string, hashedPass: string): boolean => {
	return bcrypt.compareSync(password, hashedPass)
}
