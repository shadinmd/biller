"use client"
import { Bar } from 'react-chartjs-2';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { handleAxiosError } from '@/lib/api';
import { toast } from 'sonner';
import { vendorApi } from '@/lib/vendorApi';
import { useVendor } from '@/context/vendorContext';
import moment from 'moment';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Vendor = () => {

	const [data, setData] = useState<{ _id: string, count: number }[]>([])
	const [billCount, setBillCount] = useState(0)
	const [shopCount, setShopCount] = useState(0)
	const { vendor } = useVendor()

	useEffect(() => {
		vendorApi.get("/vendor/dashboard")
			.then(({ data }) => {
				if (data.success) {
					console.log(data.bills)
					while (data.bills.length < 5) {
						data.bills.push({ _id: "none", count: 0 })
					}
					setData(data.bills)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})

		vendorApi.get(`/bill/vendor/count`)
			.then(({ data }) => {
				if (data.success) {
					setBillCount(data.count)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})

		vendorApi.get(`/shop/count`)
			.then(({ data }) => {
				if (data.success) {
					setShopCount(data.shops)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [])

	return (
		<div className="flex flex-col gap-5 items-center justify-center w-full h-full">
			<div className='flex items-center gap-5 w-full'>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">Total bills</p>
						<p className="font-bold">{billCount}</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">shops</p>
						<p className="font-bold">{shopCount}</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">bills</p>
						<p className="font-bold">9</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">Expiry</p>
						<p className="font-bold">{moment(vendor.planExpiry).format("DD-MM-YYYY")}</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

			</div>
			<div className='w-full h-full bg-white drop-shadow-lg rounded-lg p-5'>
				<p>bills created last 5 days</p>
				<Bar
					datasetIdKey='id'
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
	)
}

export default Vendor
