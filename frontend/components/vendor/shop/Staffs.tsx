"use client"
import { useEffect, useState } from "react"
import StaffInterface from "types/staff.interface"
import { Separator } from "@/components/shadcn/Seperator"
import { vendorApi, handleAxiosError } from "@/lib/api"
import { toast } from "sonner"

interface Props {
	id: string
}

const Staffs = ({ id }: Props) => {

	const [staffs, setStaffs] = useState<StaffInterface[]>([])

	useEffect(() => {
		vendorApi.get(`/staff/${id}`)
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

	return (

		<div className='flex flex-col gap-2 py-3 px-5 w-full h-full bg-white rounded-lg drop-shadow-lg'>
			<p className='text-xl font-bold'>Staffs</p>
			<div className='flex text-custom-light-gray items-center justify-between w-full'>
				<p>username</p>
			</div>
			<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
			{staffs.map((e, i) => (
				<>
					<div key={i}>
						<p>{e.username}</p>
					</div>
					<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				</>
			))}
		</div>

	)
}

export default Staffs
