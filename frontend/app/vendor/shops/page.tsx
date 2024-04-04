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
import { ScaleLoader } from "react-spinners"

const Shops = () => {

	const [shops, setShops] = useState<ShopInterface[]>([])
	const [search, setSearch] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchShops = setTimeout(() => {
			vendorApi.get(`/shop?name=${search}`)
				.then(({ data }) => {
					if (data.success) {
						setShops(data.shops)
					} else {
						toast.error(data.message)
					}
				})
				.catch((error) => {
					handleAxiosError(error)
				}).finally(() => {
					setLoading(false)
				})
		}, 500)

		return () => {
			clearTimeout(fetchShops)
		}
	}, [search])

	const addShop = (shop: ShopInterface) => {
		setShops(prev => [...prev, shop])
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full w-full bg-white rounded-lg drop-shadow-lg">
				<ScaleLoader />
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-5 p-5 items-center justify-start bg-white rounded-lg drop-shadow-lg w-full h-full">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-5 h-full">
					<p className="text-black font-bold pb-5 self-start">Shops</p>
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
				</div>
				<NewShop addShop={addShop}>
					<Icon icon={"mdi:plus"} className="text-green-500 text-2xl outline-none" />
				</NewShop>
			</div>
			<div className="flex flex-col items-center w-full">
				<div className="flex text-custom-light-gray items-center w-full">
					<p className="w-full">shop name</p>
					<p className="w-full">active</p>
					<p className="w-full">created on</p>
				</div>
				<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				{shops.map((e, i) => (
					<Link href={`/vendor/shops/${e._id}`} className="flex flex-col w-full items-center " key={i}>
						<div className="flex items-center h-10 w-full">
							<p className="w-full">{e.name}</p>
							<p className="w-full">{e.active ? "active" : "inactive"}</p>
							<p className="w-full">{moment(e.createdAt).format("DD/MM/YYYY")}</p>
						</div>
						<Separator key={shops.length + i} orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
					</Link>
				))}
			</div>
		</div>
	)
}

export default Shops
