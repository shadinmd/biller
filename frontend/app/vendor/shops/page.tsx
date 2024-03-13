"use client"

import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { useEffect, useState } from "react"
import ShopInterface from "types/shop.interface"
import { Icon } from "@iconify/react"
import { toast } from "sonner"
import { Separator } from "@/components/shadcn/Seperator"
import NewShop from "@/components/vendor/NewShop"
import moment from "moment"
import Link from "next/link"

const Shops = () => {

	const [shops, setShops] = useState<ShopInterface[]>([])
	const [search, setSearch] = useState("")

	useEffect(() => {
		vendorApi.get("/shop")
			.then(({ data }) => {
				if (data.success) {
					setShops(data.shops)
					console.log(data.shops)
				} else {
					toast.error(data.message)
				}
			})
			.catch((error) => {
				handleAxiosError(error)
			})
	}, [])

	return (
		<div className="flex flex-col gap-5 items-center w-full h-full">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2 border-2 bg-white px-3 py-1 rounded-lg outline-none">
					<Icon icon={"mdi:search"} />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search"
						type="text"
						className="w-full rounded-lg outline-none"
					/>
				</div>
				<div>
					<NewShop>
						<Icon icon={"mdi:plus"} className="text-green-500 text-2xl outline-none" />
					</NewShop>
				</div>
			</div>
			<div className="flex flex-col items-center justify-start bg-white py-3 px-5 rounded-lg drop-shadow-lg w-full h-full">
				<p className="text-black font-bold pb-5 self-start">Vendors</p>
				<div className="flex text-custom-light-gray items-center justify-between w-full">
					<p>shop name</p>
					<p>active</p>
					<p>created on</p>
				</div>
				<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				{shops.map((e, i) => (
					<>
						<Link href={`/vendor/shops/${e._id}`} className="flex w-full items-center justify-between py-2" key={i}>
							<p>{e.name}</p>
							<p>{e.active ? "active" : "inactive"}</p>
							<p>{moment(e.createdAt).format("DD/MM/YYYY")}</p>
						</Link>
						<Separator key={shops.length + i} orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
					</>
				))}
			</div>
		</div>
	)
}

export default Shops
