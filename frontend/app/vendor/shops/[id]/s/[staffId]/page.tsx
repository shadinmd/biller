"use client"

import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import StaffInterface from "types/staff.interface"

interface Props {
	params: {
		staffId: string,
		id: string
	}
}

const StaffView = ({ params }: Props) => {

	const [staff, setStaff] = useState<StaffInterface>()

	useEffect(() => {
		vendorApi.get(`/staff/${params.staffId}`)
			.then(({ data }) => {
				if (data.success) {
					setStaff(data.staff)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [params])

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex items-center bg-white drop-shadow-lg rounded-lg">
				<p>{staff?.username}</p>
			</div>
			<div className="">

			</div>
		</div>
	)
}

export default StaffView
