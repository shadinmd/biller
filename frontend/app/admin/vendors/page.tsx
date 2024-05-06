"use client"
import { useEffect, useState } from "react"
import VendorInterface from "types/vendor.interface"
import { handleAxiosError } from "@/lib/api"
import { adminApi } from "@/lib/adminApi"
import { toast } from "sonner"
import Link from "next/link"

const Vendors = () => {
	const [search, setSearch] = useState("")
	const [vendors, setVendors] = useState<VendorInterface[]>([])

	useEffect(() => {
		let timeoute = setTimeout(() => {
			adminApi.get(`/admin/vendor?name=${search}`)
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
		}, 500)

		return () => {
			clearTimeout(timeoute)
		}
	}, [search])

	return (
		<div className='flex flex-col gap-1 py-3 px-5 w-full h-full'>
			<div className="flex items-center w-full justify-between">
				<div className="flex gap-1 items-center h-full">
					<p className='flex items-center justify-center text-xl font-bold bg-white drop-shadow-lg rounded-lg px-2 h-full'>Vendors</p>
					<input
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search.."
						type="text"
						className="drop-shadow-lg outline-none rounded-lg py-2 px-3"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-1 w-full h-full">
				{vendors.map((e, i) => (
					<Link
						href={`/admin/vendors/${e?._id}`}
						key={i}
						className="flex items-center bg-white rounded-lg drop-shadow-lg w-full p-2 font-semibold"
					>
						<p className="w-full">{e?.username}</p>
					</Link>
				))}
			</div>
		</div>)
}

export default Vendors
