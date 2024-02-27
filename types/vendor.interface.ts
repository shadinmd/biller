interface VendorInterface {
	username: string
	password: string
	email: string
	phone: string
	activePlan: string
	planExpiry: Date
	active: boolean
	deleted: boolean
}

export default VendorInterface
