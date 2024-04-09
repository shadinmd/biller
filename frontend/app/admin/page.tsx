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
import { adminApi } from '@/lib/adminApi';

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
	const [billData, setBillData] = useState<{ _id: string, count: number }[]>([])
	const [subCount, setSubCount] = useState(0)
	const [labels, setLables] = useState<string[]>([])
	const [vendorCount, setVendorCount] = useState(0)

	useEffect(() => {
		adminApi.get("/subscribe/analytics")
			.then(({ data }) => {
				if (data.success) {
					if (data.data.length > labels.length) {
						let temp = data.data.map((e: { _id: string }) => e._id)
						while (temp.length < 5) {
							temp.unshift("no_data")
						}
						setLables(temp)
						setLables(data.data.map((e: { _id: string }) => e._id))
					}
					while (data.data.length < 5) {
						data.data.unshift({ _id: 'no_data', count: 0 })
					}
					setData(data.data)
				} else {
					toast.error(data.message)
				}
			}).catch(error => {
				handleAxiosError(error)
			})

		adminApi.get("/bill/analytics")
			.then(({ data }) => {
				if (data.success) {
					if (data.bills.length > labels.length) {
						let temp = data.bills.map((e: { _id: string }) => e._id)
						while (temp.length < 5) {
							temp.unshift("no_data")
						}
						setLables(temp)
					}
					while (data.bills.length < 5) {
						data.bills.unshift({ _id: 'no_data', count: 0 })
					}
					setBillData(data.bills)
					console.log(data.bills)
				} else {
					toast.error(data.message)
				}
			}).catch(error => {
				handleAxiosError(error)
			})

		adminApi.get("/subscribe/count")
			.then(({ data }) => {
				if (data.success) {
					setSubCount(data.subs)
				} else {
					toast.error(data.message)
				}
			}).catch(error => {
				handleAxiosError(error)
			})

		adminApi.get("/vendor/count")
			.then(({ data }) => {
				if (data.success) {
					setVendorCount(data.vendors)
				} else {
					toast.error(data.message)
				}
			}).catch(error => {
				handleAxiosError(error)
			})
	}, [])

	return (
		<div className="flex flex-col gap-5 items-center justify-center w-full h-full">
			<div className='flex items-center gap-5 w-full'>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">vendors</p>
						<p className="font-bold">{vendorCount}</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">subscriptions</p>
						<p className="font-bold">{subCount}</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">bills today</p>
						<p className="font-bold">{billData[billData.length - 1]?.count || 0}</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">subs today</p>
						<p className="font-bold">{data[data.length - 1]?.count || 0}</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

			</div>
			<div className='w-full h-full bg-white drop-shadow-lg rounded-lg p-5'>
				<Bar
					datasetIdKey='id'
					options={{
						maintainAspectRatio: false
					}}
					data={{
						labels: labels,
						datasets: [
							{
								label: "subs",
								data: data.map(e => e.count),
								backgroundColor: "#3F488D",
								borderColor: "#3F488D"
							},
							{
								label: "bills",
								data: billData.map(e => e.count),
								backgroundColor: "#5d3f8d",
								borderColor: "#5d3f8d"
							},
						],
					}}
				/>
			</div>
		</div>
	)
}

export default Vendor

