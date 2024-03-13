"use client"
import { Separator } from '@/components/shadcn/Seperator'
import NewProduct from '@/components/vendor/NewProduct'
import { handleAxiosError, vendorApi } from '@/lib/api'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ProductInterface from 'types/product.interface'
import ShopInterface from 'types/shop.interface'
import StaffInterface from 'types/staff.interface'

interface Props {
	params: {
		id: string
	}
}

const Shop = ({ params }: Props) => {

	const [shop, setShop] = useState<ShopInterface>()
	const [staffs, setStaffs] = useState<StaffInterface[]>([])
	const [products, setProducts] = useState<ProductInterface[]>([])

	useEffect(() => {
		vendorApi.get(`/shop/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					setShop(data.shop)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})

		api.get(`/staff/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					setStaffs(data.staffs)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})

		api.get(`/product/${params.id}`)
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
	}, [params.id])

	return (
		<div className='flex flex-col gap-3 items-start justify-center h-full w-full'>
			<div className='flex gap-5 w-full h-44'>
				<div className='w-full h-full bg-white rounded-lg drop-shadow-lg p-3'>
					<p className='text-xl font-bold'>{shop?.name}</p>
				</div>
				<div className='grid gap-5 grid-cols-2 grid-rows-2 w-full h-full'>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">plan type</p>
							<p className="font-bold">Pro</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'>
						<div>
							<p className="text-custom-light-gray">plan type</p>
							<p className="font-bold">Pro</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'>
						<div>
							<p className="text-custom-light-gray">plan type</p>
							<p className="font-bold">Pro</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'>
						<div>
							<p className="text-custom-light-gray">plan type</p>
							<p className="font-bold">Pro</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

				</div>
			</div>
			<div>

			</div>
			<div className='flex gap-5 w-full h-full'>

				<div className='flex flex-col gap-2 py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
					<div className='flex justify-between'>
						<p className='text-xl font-bold'>Products</p>
						<NewProduct shopId={params.id}>
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

				<div className='flex flex-col gap-2 py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
					<p className='text-xl font-bold'>Staffs</p>
					<div className='flex text-custom-light-gray items-center justify-between w-full'>
						<p>username</p>
					</div>
					<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
					{staffs.map((e, i) => (
						<>
							<div key={i}>
								<p>{e.username}</p>
							</div>
							<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
						</>
					))}
				</div>

			</div>
		</div>
	)
}

export default Shop
