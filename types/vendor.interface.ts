interface VendorInterface {
	_id?: string,
	username: string
	password: string
	email: string
	shop: string
	verified: boolean
	verificationToken: string
	verificationExpiry: Date
	activePlan: string
	planExpiry: Date
	active: boolean
	subscribed: boolean
	blocked: boolean
	deleted: boolean
}

export default VendorInterface
