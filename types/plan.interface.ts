interface PlanInterface {
	name: string
	description: string
	price: number
	discount: number
	active: boolean
	features: string[]
	productLimit: number
	staffLimi: number
	shopLimit: number
}

export default PlanInterface
