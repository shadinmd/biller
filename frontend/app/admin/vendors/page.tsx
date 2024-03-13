"use client"
import Select from "@/components/shared/Select"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { Separator } from "@/components/shadcn/Seperator"
import VendorInterface from "types/vendor.interface"
import { handleAxiosError } from "@/lib/api"
import { adminApi } from "@/lib/adminApi"
import { toast } from "sonner"
import Link from "next/link"

const Vendors = () => {
	const [search, setSearch] = useState("")
	const [vendors, setVendors] = useState<VendorInterface[]>([])

	const onChangeSort = (value: string) => {
		console.log(value)
	}

	useEffect(() => {
		adminApi.get("/admin/vendor")
			.then(({ data }) => {
				if (data.success) {
					setVendors(data.vendors)
				} else {
					toast.error(data.vendors)
				}
			})
			.catch((error) => {
				handleAxiosError(error)
			})
	}, [])

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
						className="w-full rounded-lg outline-none"
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
				</div>
				<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				{vendors.map((e, i) => (
					<>
						<Link href={`/admin/vendors/${e?._id}`} key={i} className="flex items-center justify-between py-1 w-full">
							<div className="flex gap-5 items-center">
								<div className="flex items-center justify-center h-[40px] w-[40px] bg-custom-light-gray rounded-md">
									<Icon icon={"mdi:person"} className="text-3xl" />
								</div>
								<div className="flex flex-col">
									<p>{e.username}</p>
									<p className="text-custom-gray">{e.email}</p>
								</div>
							</div>
						</Link>
						<Separator key={e._id} orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
					</>
				))}
			</div>
		</div>
	)
}

export default Vendors
