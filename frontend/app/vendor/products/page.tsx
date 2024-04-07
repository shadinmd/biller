"use client"
import NewProduct from "@/components/shared/NewProduct"
import { Icon } from "@iconify/react"
import { toast } from "sonner"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { useEffect, useState } from "react"
import ProductInterface from "types/product.interface"
import { Separator } from "@/components/shadcn/Seperator"
import Link from "next/link"
import { ScaleLoader } from "react-spinners"
import { useVendor } from "@/context/vendorContext"

const Products = () => {

	const [products, setProducts] = useState<ProductInterface[]>([])
	const [loading, setLoading] = useState(true)
	const { vendor } = useVendor()

	useEffect(() => {
		if (vendor.shop)
			vendorApi.get(`/product/shop/${vendor.shop}`)
				.then(({ data }) => {
					if (data.success) {
						setProducts(data.products)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				}).finally(() => {
					setLoading(false)
				})
	}, [vendor.shop])

	const newProduct = (product: ProductInterface) => {
		setProducts(products => [...products, product])
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center bg-white rounded-lg drop-shadow-lg w-full h-full">
				<ScaleLoader />
			</div>
		)
	}

	return (
		<div className='flex flex-col py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
			<div className='flex justify-between'>
				<p className='text-xl font-bold'>Products</p>
				<NewProduct shopId={vendor.shop || ""} newProduct={newProduct} api={vendorApi}>
					<Icon icon={"mdi:plus"} className='text-4xl text-green-500' />
				</NewProduct>
			</div>
			<div className='flex text-custom-light-gray justify-between w-full'>
				<p className="w-full">Name</p>
				<p className="w-full">price</p>
				<p className="w-full">stock</p>
			</div>
			<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
			{products.map((e, i) => (
				<div
					key={`staff-${i}`}
					className="flex flex-col items-center w-full"
				>
					<Link
						href={`/vendor/products/${e?._id}`}
						className='flex items-center justify-between w-full h-10'
					>
						<p className="w-full">{e.name}</p>
						<p className="w-full">{e.price}</p>
						<p className="w-full">{e.stock}</p>
					</Link>
					<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				</div>
			))}
		</div>

	)
}

export default Products

