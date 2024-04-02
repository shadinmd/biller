"use client"
import Bills from '@/components/vendor/shop/Bills'
import Products from '@/components/vendor/shop/Products'
import Staffs from '@/components/vendor/shop/Staffs'
import { handleAxiosError } from '@/lib/api'
import { vendorApi } from '@/lib/vendorApi'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import ShopInterface from 'types/shop.interface'

interface Props {
	params: {
		id: string
	}
}

const Shop = ({ params }: Props) => {

	const [shop, setShop] = useState<ShopInterface>()
	const [productCount, setProductCount] = useState(0)
	const [staffCount, setStaffCount] = useState(0)
	const [billCount, setBillCount] = useState(0)
	const [customerCount, setCustomerCount] = useState(0)

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

		vendorApi.get(`/customer/shop/${params.id}/count`)
			.then(({ data }) => {
				if (data.success) {
					setCustomerCount(data.customerCount)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [params.id])

	const copyId = useCallback(async () => {
		await navigator.clipboard.writeText(shop?._id!)
		toast.success("id copied")
	}, [shop?._id])

	return (
		<div className='flex flex-col gap-3 items-start justify-center h-full w-full'>
			<div className='flex gap-5 w-full h-44'>

				<div className='flex w-full h-full bg-white rounded-lg drop-shadow-lg p-3'>

					<div className='flex flex-col w-full h-full'>
						<p className='text-xl font-bold'>{shop?.name}</p>
						<div className='flex text-sm text-custom-light-gray items-center gap-2'>
							<p>id:</p>
							<p>{shop?._id}</p>
							<Icon icon={'solar:copy-bold'} onClick={copyId} className='cursor-pointer' />
						</div>
					</div>

					<div className='flex flex-col w-full h-full'>
					</div>

				</div>

				<div className='grid gap-5 grid-cols-2 grid-rows-2 w-full h-full'>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">customers</p>
							<p className="font-bold">{customerCount}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'>
						<div>
							<p className="text-custom-light-gray">bills</p>
							<p className="font-bold">{billCount}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'>
						<div>
							<p className="text-custom-light-gray">products</p>
							<p className="font-bold">{productCount}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'>
						<div>
							<p className="text-custom-light-gray">staffs</p>
							<p className="font-bold">{staffCount}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>
				</div>
			</div>

			<div className='flex gap-5 w-full h-full overflow-hidden'>
				<Products id={params.id} setProductCount={setProductCount} />
				<Staffs id={params.id} setStaffCount={setStaffCount} />
				<Bills id={params.id} setBillCount={setBillCount} />
			</div>

		</div>
	)
}

export default Shop
