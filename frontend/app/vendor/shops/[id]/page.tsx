"use client"
import Products from '@/components/vendor/shop/Products'
import Staffs from '@/components/vendor/shop/Staffs'
import { handleAxiosError } from '@/lib/api'
import { vendorApi } from '@/lib/vendorApi'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ShopInterface from 'types/shop.interface'

interface Props {
	params: {
		id: string
	}
}

const Shop = ({ params }: Props) => {

	const [shop, setShop] = useState<ShopInterface>()

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
				search here
			</div>

			<div className='flex gap-5 w-full h-full'>
				<Products id={params.id} />
				<Staffs id={params.id} />
			</div>

		</div>
	)
}

export default Shop
