interface StaffInterface {
	_id: string
	username: string
	password: string
	shop: string
	manager: boolean
	blocked: boolean
	createdAt: Date
}

export default StaffInterface
