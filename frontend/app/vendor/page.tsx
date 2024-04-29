"use client"
import { handleAxiosError } from '@/lib/api'
import { vendorApi } from '@/lib/vendorApi'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { toast } from 'sonner'
import ShopInterface from 'types/shop.interface'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { useVendor } from '@/context/vendorContext'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Shop = () => {

	const { vendor } = useVendor()
	const [shop, setShop] = useState<ShopInterface>()
	const [productCount, setProductCount] = useState(0)
	const [staffCount, setStaffCount] = useState(0)
	const [billCount, setBillCount] = useState(0)
	const [customerCount, setCustomerCount] = useState(0)
	const [data, setData] = useState<{ _id: string, count: number }[]>([])
	const router = useRouter()

	useEffect(() => {
		vendorApi.get(`/shop`)
			.then(({ data }) => {
				if (data.success) {
					if (!data.shop) {
						router.push("/vendor/newshop")
					}
					setShop(data.shop)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [])

	useEffect(() => {
		if (shop?._id) {
			vendorApi.get(`/customer/shop/${shop._id}/count`)
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

			vendorApi.get(`/product/shop/${shop._id}/count`)
				.then(({ data }) => {
					if (data.success) {
						setProductCount(data.products)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})

			vendorApi.get(`/staff/shop/${shop._id}/count`)
				.then(({ data }) => {
					if (data.success) {
						setStaffCount(data.staffs)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})

			vendorApi.get(`/bill/shop/${shop._id}/count`)
				.then(({ data }) => {
					if (data.success) {
						setBillCount(data.bills)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})

			vendorApi.get(`/shop/data?shop=${shop._id}`)
				.then(({ data }) => {
					if (data.success) {
						while (data.bills.length < 5) {
							data.bills.unshift({ _id: "no_data", count: 0 })
						}
						setData(data.bills)
					} else {
						toast.error(data.message)
					}
				})
				.catch((error) => {
					handleAxiosError(error)
				})
		}
	}, [shop?._id])

	const copyId = useCallback(async () => {
		await navigator.clipboard.writeText(shop?._id!)
		toast.success("id copied")
	}, [shop?._id])

	return (
		<div className='flex flex-col gap-3 items-start justify-center h-full w-full'>
			<div className='flex flex-col lg:flex-row gap-5 w-full h-full lg:h-44'>

				<div className='flex w-full h-full bg-white rounded-lg drop-shadow-lg p-3'>

					<div className='flex flex-col w-full h-full font-semibold'>
						<p className='text-xl font-bold'>{shop?.name}</p>
						<div className='flex text-sm text-custom-light-gray items-center gap-2'>
							<p>id:</p>
							<p>{shop?._id}</p>
							<Icon icon={'solar:copy-bold'} onClick={copyId} className='cursor-pointer' />
						</div>
						<div className='flex gap-1'>
							<p>started on: </p>
							<p>{moment(shop?.createdAt).format("DD/MM/YYYY")}</p>
						</div>
						<div className='flex gap-1'>
							<p>plan type: </p>
							<p>{vendor.activePlan?.name}</p>
						</div>
						<div className='flex gap-1'>
							<p>plan expiry: </p>
							<p>{moment(vendor.planExpiry).format("DD/MM/YYYY")}</p>
						</div>
					</div>

					<div className='flex flex-col w-full h-full'>
					</div>

				</div>

				<div className='flex gap-5 flex-col w-full h-full'>
					<div className='flex gap-5 w-full h-full'>
						<Link
							href={`/vendor/customers`}
							className="flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg"
						>
							<div>
								<p className="text-custom-light-gray">customers</p>
								<p className="font-bold">{customerCount}</p>
							</div>
							<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
								<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
							</div>
						</Link>

						<Link
							href={`/vendor/bills`}
							className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'
						>
							<div>
								<p className="text-custom-light-gray">bills</p>
								<p className="font-bold">{billCount}</p>
							</div>
							<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
								<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
							</div>
						</Link>
					</div>


					<div className='flex gap-5 items-center w-full h-full'>
						<Link
							href={`/vendor/products`}
							className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'
						>
							<div>
								<p className="text-custom-light-gray">products</p>
								<p className="font-bold">{productCount}</p>
							</div>
							<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
								<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
							</div>
						</Link>

						<Link
							href={`/vendor/staffs`}
							className='flex items-center justify-between p-4 w-full h-full bg-white rounded-lg drop-shadow-lg'
						>
							<div>
								<p className="text-custom-light-gray">staffs</p>
								<p className="font-bold">{staffCount}</p>
							</div>
							<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
								<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
							</div>
						</Link>

						<div />
					</div>
				</div>
			</div>

			<div className='flex items-center justify-center gap-5 w-full h-full rounded-lg bg-white drop-shadow-lg p-5'>
				<div className='flex items-center justify-center h-full w-full'>
					<Bar
						datasetIdKey='id'
						options={{
							maintainAspectRatio: false
						}}
						data={{
							labels: data.map(e => e._id),
							datasets: [
								{
									label: "bills",
									data: data.map(e => e.count),
									backgroundColor: "#3F488D",
									borderColor: "#3F488D"
								},
							],
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default Shop

