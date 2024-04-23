"use client"
import NewProduct from "@/components/shared/NewProduct"
import { Icon } from "@iconify/react"
import { toast } from "sonner"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { useEffect, useState } from "react"
import ProductInterface from "types/product.interface"
import Link from "next/link"
import { ScaleLoader } from "react-spinners"
import { useStaff } from "@/context/staffContext"

const Products = () => {

	const [products, setProducts] = useState<ProductInterface[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")
	const { staff } = useStaff()

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (staff.shop)
				vendorApi.get(`/product/shop/${staff.shop._id}?name=${search}`)
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
		}, 500)

		return () => {
			clearTimeout(timeout)
		}
	}, [staff.shop, search])

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
		<div className='flex flex-col gap-1 py-3 px-5 w-full h-full'>
			<div className='flex justify-between'>
				<div className="flex items-center gap-1">
					<p className='flex items-center justify-center text-xl font-bold bg-white drop-shadow-lg rounded-lg p-2'>Products</p>
					<input
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search.."
						type="text"
						className="rounded-lg py-2 px-3 drop-shadow-lg outline-none font-semibold"
					/>
				</div>
				<NewProduct className="bg-white rounded-lg drop-shadow-lg" shopId={staff.shop._id || ""} newProduct={newProduct} api={vendorApi}>
					<Icon icon={"mdi:plus"} className='text-4xl text-green-500' />
				</NewProduct>
			</div>
			<div className="flex flex-col gap-1">
				{products.map((e, i) => (
					<Link
						href={`/staff/products/${e?._id}`}
						key={i}
						className="flex items-center w-full rounded-lg bg-white drop-shadow-lg p-2 font-semibold"
					>
						<div className="pr-2">
							<div className={`flex items-center justify-center size-10 rounded-lg`}>
								{
									e.image ?
										<img src={e.image} className="h-full w-full" alt="" /> :
										<Icon icon={"mdi:image"} className="text-gray-500 text-4xl" />
								}
							</div>
						</div>
						<p className="w-full">{e.name}</p>
						<p className="w-full">pirce: {e.price}</p>
						<p className="w-full">stock: {e.stock}</p>
					</Link>
				))}
			</div>
		</div >

	)
}

export default Products


