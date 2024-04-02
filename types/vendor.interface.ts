interface VendorInterface {
	_id?: string,
	username: string
	password: string
	email: string
	verified: boolean
	verificationToken: string
	activePlan: string
	planExpiry: Date
	active: boolean
	blocked: boolean
	deleted: boolean
}

export default VendorInterface
