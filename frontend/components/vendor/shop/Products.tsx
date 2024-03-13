"use client"
import NewProduct from "../NewProduct"
import { Icon } from "@iconify/react"
import { toast } from "sonner"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { useEffect, useState } from "react"
import ProductInterface from "types/product.interface"
import { Separator } from "@/components/shadcn/Seperator"

interface Props {
	id: string
}

const Products = ({ id }: Props) => {

	const [products, setProducts] = useState<ProductInterface[]>([])

	useEffect(() => {
		vendorApi.get(`/product/${id}`)
			.then(({ data }) => {
				if (data.success) {
					setProducts(data.products)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [id])

	return (
		<div className='flex flex-col gap-2 py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
			<div className='flex justify-between'>
				<p className='text-xl font-bold'>Products</p>
				<NewProduct shopId={id}>
					<Icon icon={"mdi:plus"} className='text-4xl text-green-500' />
				</NewProduct>
			</div>
			<div className='flex text-custom-light-gray justify-between w-full'>
				<p>Name</p>
				<p>price</p>
				<p>profit</p>
			</div>
			<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
			{products.map((e, i) => (
				<>
					<div className='flex items-center justify-between w-full' key={i}>
						<p>{e.name}</p>
						<p>{e.price}</p>
						<p>{e.profit}</p>
					</div>
					<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				</>
			))}
		</div>

	)
}

export default Products
