"use client"
import { useEffect, useState } from "react"
import { Separator } from "@/components/shadcn/Seperator"
import { handleAxiosError } from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
import { ScaleLoader } from "react-spinners"
import CustomerInterface from "types/customer.interface"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react/dist/iconify.js"
import NewCustomer from "@/components/staff/NewCustomer"
import { useVendor } from "@/context/vendorContext"
import { staffApi } from "@/lib/staffApi"
import { useStaff } from "@/context/staffContext"

const Customers = () => {

	const [customers, setCustomers] = useState<CustomerInterface[]>([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")
	const router = useRouter()

	const { staff } = useStaff()

	useEffect(() => {
		if (staff.shop)
			staffApi.get(`/customer/shop/${staff.shop}`)
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
	}, [staff.shop])

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
		<div className='flex flex-col gap-5 w-full h-full'>
			<div className="flex items-center w-full justify-between">
				<p className='text-xl font-bold'>Customers</p>
				<input
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder="Name..."
					type="text"
					className=""
				/>
				<NewCustomer shopId={staff?._id || ""} api={staffApi} className="flex items-center justify-center bg-white rounded-lg drop-shadow-lg size-8" >
					<Icon icon={"mdi:plus"} className="text-green-500 text-2xl" />
				</NewCustomer>
			</div>
			<div className="flex flex-col py-3 px-5 w-full h-full rounded-lg bg-white drop-shadow-lg">
				<div className='flex text-custom-light-gray items-center justify-between w-full'>
					<p className="w-full">username</p>
				</div>
				<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
				{customers.map((e, i) => (
					<Link
						className="flex flex-col w-full"
						href={`/vendor/shops/customers/${e?._id}`}
						key={i}
					>
						<div className="flex w-full items-center h-10">
							<p className="w-full">{e?.name}</p>
						</div>
						<Separator orientation="horizontal" className="w-full bg-custom-light-gray opacity-60" />
					</Link>
				))}
			</div>
		</div>

	)
}

export default Customers
