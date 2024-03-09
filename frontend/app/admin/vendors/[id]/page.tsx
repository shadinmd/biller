"use client"

import api, { handleAxiosError } from "@/lib/api"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import VendorInterface from "types/vendor.interface"

interface Props {
	params: { id: string }
}

const Vendor = ({ params: { id } }: Props) => {

	const [vendor, setVendor] = useState<VendorInterface>()

	useEffect(() => {
		api.get(`/admin/vendor/${id}`)
			.then(({ data }) => {
				if (data.success) {
					setVendor(data.vendor)
				} else {
					toast.error(data.message)
				}
			})
			.catch((error) => {
				handleAxiosError(error)
			})
	}, [id])

	const blockVendor = async () => {
		try {
			const { data } = await api.post(`/admin/vendor/block`, { id, blocked: vendor?.blocked ? false : true })
			if (data.success) {
				toast.success(data.message)
				let temp = { ...vendor }
				temp.blocked = vendor?.blocked ? false : true
				setVendor(temp as VendorInterface)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className="flex flex-col gap-5 items-start w-full h-full">

			<div className="flex gap-5 w-full h-40">

				<div className="flex p-2 items-start w-full h-full bg-white rounded-lg drop-shadow-lg">
					<div>
						<Icon icon={"mdi:person"} className="text-7xl" />
					</div>
					<p className="text-black font-bold">{vendor?.username}</p>
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
						<p className="font-bold">Block vendor</p>
						<button onClick={() => blockVendor()} className="bg-red-500 text-white rounded-lg px-4 py-2 font-bold">
							{vendor?.blocked ? "Un Block" : "Block"}
						</button>
					</div>
					<div className="flex items-center justify-between bg-white rounded-lg drop-shadow-lg w-full p-4">
						<p className="font-bold">Delete Account</p>
						<button className="bg-red-500 text-white rounded-lg px-4 py-2 font-bold">
							Delete
						</button>
					</div>
				</div>
				<div className="flex items-center w-full">

				</div>
			</div>
		</div>
	)
}

export default Vendor
