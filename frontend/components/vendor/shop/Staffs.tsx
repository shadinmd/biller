"use client"
import { useEffect, useState } from "react"
import StaffInterface from "types/staff.interface"
import { Separator } from "@/components/shadcn/Seperator"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { toast } from "sonner"
import NewStaff from "../NewStaff"
import { Icon } from "@iconify/react"
import Link from "next/link"

interface Props {
	id: string
}

const Staffs = ({ id }: Props) => {

	const [staffs, setStaffs] = useState<StaffInterface[]>([])

	useEffect(() => {
		vendorApi.get(`/staff/shop/${id}`)
			.then(({ data }) => {
				if (data.success) {
					setStaffs(data.staffs)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [id])

	const newStaff = (staff: StaffInterface) => {
		setStaffs(val => [...val, staff])
	}

	return (
		<div className='flex flex-col gap-2 py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
			<div className="flex items-center w-full justify-between">
				<p className='text-xl font-bold'>Staffs</p>
				<NewStaff shopId={id} newStaff={newStaff} >
					<Icon icon="mdi:plus" className="text-green-500 text-4xl" />
				</NewStaff>
			</div>
			<div className='flex text-custom-light-gray items-center justify-between w-full'>
				<p>username</p>
			</div>
			<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
			{staffs.map((e, i) => (
				<>
					<Link href={`/vendor/shops/${id}/s/${e?._id}`} key={i}>
						<p>{e?.username}</p>
					</Link>
					<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				</>
			))}
		</div>

	)
}

export default Staffs
