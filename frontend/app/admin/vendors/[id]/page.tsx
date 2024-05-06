"use client"

import { handleAxiosError } from "@/lib/api"
import { adminApi } from "@/lib/adminApi"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import VendorInterface, { FullVendorInterface } from "types/vendor.interface"
import moment from "moment"

interface Props {
	params: { id: string }
}

const Vendor = ({ params: { id } }: Props) => {

	const [vendor, setVendor] = useState<FullVendorInterface>()
	const [customerCount, setCustomerCount] = useState(0)
	const [staffCount, setStaffCount] = useState(0)
	const [billCount, setBillCount] = useState(0)
	const [productCount, setProductCount] = useState(0)

	useEffect(() => {
		adminApi.get(`/admin/vendor/${id}`)
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

	useEffect(() => {
		if (vendor?.shop) {
			adminApi.get(`/customer/shop/${vendor.shop}/count`)
				.then(({ data }) => {
					if (data.success) {
						setCustomerCount(data.customerCount)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})

			adminApi.get(`/product/shop/${vendor.shop}/count`)
				.then(({ data }) => {
					if (data.success) {
						setProductCount(data.products)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})

			adminApi.get(`/staff/shop/${vendor.shop}/count`)
				.then(({ data }) => {
					if (data.success) {
						setStaffCount(data.staffs)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})

			adminApi.get(`/bill/shop/${vendor.shop}/count`)
				.then(({ data }) => {
					if (data.success) {
						setBillCount(data.bills)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})

		}
	}, [vendor?.shop])

	const blockVendor = async () => {
		try {
			const { data } = await adminApi.post(`/admin/vendor/block`, { id, blocked: vendor?.blocked ? false : true })
			if (data.success) {
				toast.success(data.message)
				let temp = { ...vendor }
				temp.blocked = vendor?.blocked ? false : true
				setVendor(temp as FullVendorInterface)
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

				<div className="flex gap-5 p-2 items-start w-full h-full bg-white rounded-lg drop-shadow-lg">
					<div>
						<Icon icon={"mdi:person"} className="text-7xl" />
					</div>
					<div className="flex flex-col">
						<p className="text-black font-bold">{vendor?.username}</p>
						<div className="flex items-center gap-5">
							<p className="text-black font-bold">Plan: </p>
							<p className="text-black font-bold">{vendor?.activePlan?.name}</p>
						</div>
						<div className="flex items-center gap-5">
							<p className="text-black font-bold">Plan Expiry: </p>
							<p className="text-black font-bold">{moment(vendor?.planExpiry).format("DD-MM-YYYY")}</p>
						</div>
					</div>
				</div>

				<div className="grid gap-5 grid-cols-2 grid-rows-2 w-full h-full">

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">Bills</p>
							<p className="font-bold">{billCount}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">Products</p>
							<p className="font-bold">{productCount}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"game-icons:money-stack"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">Staffs</p>
							<p className="font-bold">{staffCount}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"mdi:account-group"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-white rounded-lg drop-shadow-lg">
						<div>
							<p className="text-custom-light-gray">customers</p>
							<p className="font-bold">{customerCount}</p>
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
