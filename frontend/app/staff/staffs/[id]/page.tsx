"use client"

import YesNoModal from "@/components/shared/YesNoModal"
import { handleAxiosError } from "@/lib/api"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { Icon } from "@iconify/react"
import { Separator } from "@/components/shadcn/Seperator"
import { staffApi } from "@/lib/staffApi"
import StaffInterface from "types/staff.interface"
import ResetPassword from "@/components/staff/ResetPassword"

interface Props {
	params: {
		id: string
	}
}

const ProductView = ({ params }: Props) => {

	const [staff, setStaff] = useState<StaffInterface>({
		_id: "",
		username: "",
		password: "",
		shop: "",
		manager: false,
		blocked: false
	})

	useEffect(() => {
		staffApi.get(`/staff/${params.id}`)
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

	const blockStaff = useCallback(async () => {
		if (staff?._id)
			try {
				const { data } = await staffApi.put(`/staff/block/${staff?._id}`, { blocked: !staff.blocked })
				if (data.success) {
					setStaff((prev) => ({ ...prev, blocked: !staff.blocked }))
					toast.success(data.message)
				} else {
					toast.error(data.message)
				}
			} catch (error) {
				handleAxiosError(error)
			}
		else
			toast.error("something went wrong")
	}, [staff?._id, staff.blocked])

	return (
		<div className="flex flex-col gap-5 items-start w-full h-full">

			<div className="flex gap-5 w-full h-40">

				<div className="flex p-3 items-start w-full h-full bg-white rounded-lg drop-shadow-lg">
					<div className="flex gap-2 items-center">
						<Icon icon={"mdi:person"} className="text-7xl" />
						<p className="text-black font-bold">{staff?.username}</p>
					</div>
					<div className="flex items-start justify-end w-full h-full">
						<div className={`${staff.blocked ? "bg-red-500" : "bg-green-500"} p-1 rounded-lg text-white font-bold`}>
							{staff.blocked ? "blocked" : "active"}
						</div>
					</div>
				</div>

				<div className="grid gap-5 grid-cols-2 grid-rows-2 w-full h-full">

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">plan type</p>
							<p className="font-bold">Pro</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">profit this month</p>
							<p className="font-bold">$50,000</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"game-icons:money-stack"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">Staffs</p>
							<p className="font-bold">5</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"mdi:account-group"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">Shops</p>
							<p className="font-bold">1</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"mdi:store"} className="text-white text-2xl" />
						</div>
					</div>

				</div>
			</div>

			<div className="flex gap-5 w-full h-20">
				<div className="flex gap-5 w-full">
					<div className="flex items-center justify-between bg-white rounded-lg drop-shadow-lg w-full p-4">
						<p className="font-bold">Block staff</p>
						<YesNoModal
							title={staff.blocked ? "Unblock" : "Block"}
							description={staff.blocked ? "unblock this staff" : "block this staff"}
							onNo={() => { }}
							onYes={blockStaff}
						>
							<div className="bg-red-500 text-white rounded-lg px-4 py-2 font-bold">
								{staff.blocked ? "Un block" : "Block"}
							</div>
						</YesNoModal>
					</div>
					<div className="flex items-center justify-between bg-white rounded-lg drop-shadow-lg w-full p-4">
						<p className="font-bold">Reset Password</p>
						<ResetPassword api={staffApi} staffId={staff?._id!}>
							<div className="bg-red-500 text-white rounded-lg px-4 py-2 font-bold">
								Reset
							</div>
						</ResetPassword>
					</div>
				</div>
				<div className="flex items-center w-full">

				</div>
			</div>
		</div>
	)
}

export default ProductView


