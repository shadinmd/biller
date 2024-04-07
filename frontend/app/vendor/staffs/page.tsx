"use client"
import { useEffect, useState } from "react"
import StaffInterface from "types/staff.interface"
import { Separator } from "@/components/shadcn/Seperator"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { toast } from "sonner"
import NewStaff from "@/components/shared/NewStaff"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { ScaleLoader } from "react-spinners"
import cn from "@/lib/cn"
import { useVendor } from "@/context/vendorContext"

const Staffs = () => {

	const [staffs, setStaffs] = useState<StaffInterface[]>([])
	const [loading, setLoading] = useState(true)
	const { vendor } = useVendor()

	useEffect(() => {
		if (vendor.shop)
			vendorApi.get(`/staff/shop/${vendor.shop}`)
				.then(({ data }) => {
					if (data.success) {
						setStaffs(data.staffs)
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

	const newStaff = (staff: StaffInterface) => {
		setStaffs(val => [...val, staff])
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center bg-white rounded-lg drop-shadow-lg w-full h-full">
				<ScaleLoader />
			</div>
		)
	}

	return (
		<div className='flex flex-col py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
			<div className="flex items-center w-full justify-between">
				<p className='text-xl font-bold'>Staffs</p>
				<NewStaff shopId={vendor.shop || ""} newStaff={newStaff} api={vendorApi} >
					<Icon icon="mdi:plus" className="text-green-500 text-4xl" />
				</NewStaff>
			</div>
			<div className='flex text-custom-light-gray items-center justify-between w-full'>
				<p className="w-full">username</p>
				<p className="w-full">type</p>
			</div>
			<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
			{staffs.map((e, i) => (
				<Link
					className="flex flex-col w-full"
					href={`/vendor/staffs/${e?._id}`}
					key={i}
				>
					<div className="flex w-full items-center h-10">
						<p className="w-full">{e?.username}</p>
						<p className={cn("w-full", e.manager ? "text-red-500" : "text-green-500")}>{e?.manager ? "manager" : "staff"}</p>
					</div>
					<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				</Link>
			))}
		</div>

	)
}

export default Staffs

