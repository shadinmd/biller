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
	const [search, setSearch] = useState("")
	const { vendor } = useVendor()

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (vendor.shop)
				vendorApi.get(`/staff/shop/${vendor.shop}?name=${search}`)
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
		}, 500)

		return () => {
			clearTimeout(timeout)
		}
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
		<div className='flex flex-col gap-1 py-3 px-5 w-full h-full'>
			<div className="flex items-center w-full justify-between">
				<div className="flex gap-1 items-center h-full">
					<p className='flex items-center justify-center text-xl font-bold bg-white drop-shadow-lg rounded-lg px-2 h-full'>Staffs</p>
					<input
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search.."
						type="text"
						className="drop-shadow-lg outline-none rounded-lg py-2 px-3"
					/>
				</div>
				<NewStaff className="bg-white rounded-lg drop-shadow-lg" shopId={vendor.shop || ""} newStaff={newStaff} api={vendorApi} >
					<Icon icon="mdi:plus" className="text-green-500 text-3xl" />
				</NewStaff>
			</div>
			<div className="flex flex-col gap-1 w-full h-full">
				{staffs.map((e, i) => (
					<Link
						href={`/vendor/staffs/${e?._id}`}
						key={i}
						className="flex items-center bg-white rounded-lg drop-shadow-lg w-full p-2 font-semibold"
					>
						<p className="w-full">{e?.username}</p>
						<p className={cn("w-full", e.manager ? "text-red-500" : "text-green-500")}>{e?.manager ? "manager" : "staff"}</p>
					</Link>
				))}
			</div>
		</div>

	)
}

export default Staffs

