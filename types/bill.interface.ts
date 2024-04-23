interface BillInterface {
	_id: string
	staff: string
	shop: string
	products: { product: string, quantity: number }[]
	total: number
	discount: number
	totalAtfterDiscount: number
	createdAt: Date,
	customer: string
}

export default BillInterface
