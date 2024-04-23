"use client"
import { toast } from "sonner"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners"
import BillInterface from "types/bill.interface"
import moment from "moment"
import Link from "next/link"
import { useStaff } from "@/context/staffContext"

const Bills = () => {

	const [bills, setBills] = useState<BillInterface[]>([])
	const [loading, setLoading] = useState(true)
	const { staff } = useStaff()

	useEffect(() => {
		if (staff.shop._id)
			vendorApi.get(`/bill/shop/${staff.shop._id}`)
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
	}, [staff.shop])

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
				<p className='flex items-center justify-center text-xl font-bold bg-white drop-shadow-lg rounded-lg p-2'>Bills</p>
			</div>
			<div className="flex flex-col gap-1 w-full">
				{bills.map((e, i) => (
					<Link
						href={`/staff/bills/${e._id}`}
						key={`staff-${i}`}
						className="flex items-center w-full p-2 font-semibold bg-white rounded-lg drop-shadow-lg"
					>
						<p className="w-full">{moment(e.createdAt).format("HH:mm DD/MM/YY")}</p>
						<p className="w-full">{e.totalAtfterDiscount}₹</p>
					</Link>
				))}
			</div>
		</div>

	)
}

export default Bills



