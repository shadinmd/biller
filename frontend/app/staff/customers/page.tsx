"use client"
import { useEffect, useState } from "react"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { toast } from "sonner"
import Link from "next/link"
import { ScaleLoader } from "react-spinners"
import CustomerInterface from "types/customer.interface"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react/dist/iconify.js"
import NewCustomer from "@/components/staff/NewCustomer"
import { useStaff } from "@/context/staffContext"

const Customers = () => {

	const [customers, setCustomers] = useState<CustomerInterface[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")
	const router = useRouter()

	const { staff } = useStaff()

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (staff.shop)
				vendorApi.get(`/customer/shop/${staff.shop._id}?name=${search}`)
					.then(({ data }) => {
						if (data.success) {
							setCustomers(data.customers)
						} else {
							toast.error(data.message)
						}
					})
					.catch(error => {
						handleAxiosError(error)
					}).finally(() => {
						setLoading(false)
					})
		}, 500)
		return () => {
			clearTimeout(timeout)
		}
	}, [staff.shop, search])

	const newCustomer = (customer: CustomerInterface) => {
		setCustomers(val => [...val, customer])
	}

	const goBack = () => {
		router.back()
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center bg-white rounded-lg drop-shadow-lg w-full h-full">
				<ScaleLoader />
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-1 py-3 px-5 w-full h-full'>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-2 h-full">
					<p className='flex items-center px-2 justify-center text-xl font-bold bg-white drop-shadow-lg rounded-lg h-full'>Customers</p>
					<input
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Name..."
						type="text"
						className="rounded-lg px-3 py-2 drop-shadow-lg outline-none font-semibold"
					/>
				</div>
				<NewCustomer setCustomers={newCustomer} shopId={staff._id || ""} api={vendorApi} className="flex items-center justify-center bg-white rounded-lg drop-shadow-lg size-8" >
					<Icon icon={"mdi:plus"} className="text-green-500 text-2xl" />
				</NewCustomer>
			</div>
			<div className="flex flex-col gap-1 w-full h-full">
				{customers.map((e, i) => (
					<Link
						href={`/staff/customers/${e?._id}`}
						key={i}
						className="flex flex-col w-full bg-white drop-shadow-lg rounded-lg p-2 font-semibold"
					>
						<p className="w-full">{e?.name}</p>
					</Link>
				))}
			</div>
		</div>

	)
}

export default Customers
