"use client"
import { useEffect, useState } from "react"
import PlanInterface from "types/plan.interface"
import { toast } from "sonner"
import { handleAxiosError } from "@/lib/api"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { adminApi } from "@/lib/adminApi"

const Plans = () => {

	const [plans, setPlans] = useState<PlanInterface[]>([])
	const [search, setSearch] = useState("")

	useEffect(() => {
		adminApi.get("/admin/plan")
			.then(({ data }) => {
				if (data.success) {
					setPlans(data.plans)
				} else {
					toast.error(data.message)
				}
			})
			.catch((error) => {
				handleAxiosError(error)
			})
	}, [])

	return (
		<div className="flex flex-col gap-3 w-full h-full bg-custom-offwhite">
			<div className="flex items-center justify-between">
				<div className="flex gap-3 items-center w-full">
					<div className="flex items-center gap-2 border-2 bg-white px-3 py-1 rounded-lg w-full">
						<Icon icon={"mdi:search"} />
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search"
							type="text"
							className="w-full rounded-lg pr-3 outline-none"
						/>
					</div>
				</div>
				<div className="flex items-center">
					<Link href={"/admin/newPlan"}>
						<Icon icon={"mdi:plus"} className="text-4xl text-green-600" />
					</Link>
				</div>
			</div>
			<div className="flex gap-5 items-center w-full h-full">
				<div className="flex flex-col gap-5  h-full w-full bg-white drop-shadow-lg rounded-lg p-6">
					<p className="text-black font-bold pb-5">Plans</p>
					{plans.map((e, i) => (
						<div key={i} className="flex flex-col p-1 items-start justify-between bg-custom-offwhite rounded-lg">
							<div className="flex items-center justify-between w-full">
								<p className="text-lg font-bold">{e.name}</p>
								<div className="flex items-center gap-1 p-1">
									<Link href={`/admin/plans/${e?._id}`} className="outline-none">
										<Icon icon={"mdi:pencil"} className="text-xl" />
									</Link>
									<button className="outline-none">
										<Icon icon={"mdi:trash"} className="text-xl text-red-500" />
									</button>
								</div>
							</div>
							<div className="flex gap-1">
								<p>Bill limit: </p>
								<p>{e.billLimit}</p>
							</div>
							<div className="flex gap-1">
								<p>Shop limit: </p>
								<p>{e.shopLimit}</p>
							</div>
							<div className="flex gap-1">
								<p>Product limit: </p>
								<p>{e.productLimit}</p>
							</div>
							<div className="flex gap-1">
								<p>Active: </p>
								<p>{e.active ? "yes" : "no"}</p>
							</div>
						</div>
					))}
				</div>
				<div className="flex flex-col w-[30rem] h-full bg-white rounded-lg drop-shadow-lg">

				</div>
			</div>
		</div>
	)
}

export default Plans
