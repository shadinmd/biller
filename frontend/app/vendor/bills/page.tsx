"use client"
import { toast } from "sonner"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { useEffect, useState } from "react"
import { Separator } from "@/components/shadcn/Seperator"
import { ScaleLoader } from "react-spinners"
import BillInterface from "types/bill.interface"
import moment from "moment"
import { useVendor } from "@/context/vendorContext"

const Bills = () => {

	const [bills, setBills] = useState<BillInterface[]>([])
	const [loading, setLoading] = useState(true)
	const { vendor } = useVendor()

	useEffect(() => {
		if (vendor.shop)
			vendorApi.get(`/bill/shop/${vendor.shop}`)
				.then(({ data }) => {
					if (data.success) {
						setBills(data.bills)
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

	if (loading) {
		return (
			<div className="flex items-center justify-center bg-white rounded-lg drop-shadow-lg w-full h-full">
				<ScaleLoader />
			</div>
		)
	}

	return (
		<div className='flex flex-col py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
			<div className="flex flex-col">
				<div className='flex justify-between'>
					<p className='text-xl font-bold'>Bills</p>
				</div>
				<div className='flex text-custom-light-gray justify-between w-full'>
					<p className="w-full">date</p>
					<p className="w-full">items</p>
					<p className="w-full">total</p>
				</div>
				<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				{bills.map((e, i) => (
					<div
						key={`staff-${i}`}
						className="flex flex-col items-center w-full"
					>
						<div
							className='flex items-center justify-between w-full h-10'
						>
							<p className="w-full">{moment(e.createdAt).format("DD/MM/YY")}</p>
							<p className="w-full">{e.products.length}</p>
							<p className="w-full">{e.totalAtfterDiscount}</p>
						</div>
						<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
					</div>
				))}
			</div>
		</div>

	)
}

export default Bills


