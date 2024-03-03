"use client"
import Select from "@/components/shared/Select"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { Separator } from "@/components/shadcn/Seperator"
import VendorInterface from "types/vendor.interface"
import api, { handlAxiosError } from "@/lib/api"
import { toast } from "sonner"

const Vendors = () => {
	const [search, setSearch] = useState("")
	const [vendors, setVendors] = useState<VendorInterface[]>([])

	const onChangeSort = (value: string) => {
		console.log(value)
	}

	useEffect(() => {
		api.get("/admin/vendors")
			.then(({ data }) => {
				if (data.success) {
					setVendors(data.vendors)
				} else {
					toast.error(data.vendors)
				}
			})
			.catch((error) => {
				handlAxiosError(error)
			})
	},[])

	return (
		<div className="flex flex-col gap-5 w-full h-full bg-custom-offwhite">
			<div className="flex gap-2 w-full pr-5">
				<div className="flex items-center gap-2 border-2 bg-white px-3 py-1 rounded-lg">
					<Icon icon={"mdi:search"} />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search"
						type="text"
						className="w-full rounded-lg"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Select items={["random"]} onSelect={onChangeSort} />
					<Select items={["random"]} onSelect={onChangeSort} />
				</div>
			</div>
			<div className="flex flex-col bg-white rounded-lg w-full h-full py-3 px-5 drop-shadow-lg">
				<p className="text-black font-bold pb-5">Vendors</p>
				<div className="flex items-center text-custom-light-gray justify-between w-full">
					<p>Vendor</p>
					<p>Status</p>
					<p>last subscribed</p>
				</div>
				<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				{vendors.map((e, i) => (
					<div key={i} className="flex items-center justify-between">
						<p>{e.username}</p>
						<p>{e.planExpiry.toString()}</p>
						<p>{e.email}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Vendors
