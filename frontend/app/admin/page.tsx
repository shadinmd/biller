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

	useEffect(() => {
	}, [])

	return (
		<div className="flex flex-col gap-5 items-center justify-center w-full h-full">
			<div className='flex items-center gap-5 w-full'>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">vendors</p>
						<p className="font-bold">0</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

				<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg w-full">
					<div>
						<p className="text-custom-light-gray">subscriptions</p>
						<p className="font-bold">0</p>
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
						<p className="text-custom-light-gray">new subs</p>
						<p className="font-bold">0</p>
					</div>
					<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
						<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
					</div>
				</div>

			</div>
			<div className='w-full h-full bg-white drop-shadow-lg rounded-lg p-5'>
				<Bar
					datasetIdKey='id'
					data={{
						labels: data.map(e => e._id),
						datasets: [
							{
								label: "subs",
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

