import crypto from "crypto"

function generateToken(input: string): string {
	const salt = crypto.randomBytes(16).toString('hex')

	const inputWithSalt = `${input}${salt}`

	const sha256 = crypto.createHash('sha256')
	sha256.update(inputWithSalt)
	const token = sha256.digest('hex')

	return token
}

export default generateToken
