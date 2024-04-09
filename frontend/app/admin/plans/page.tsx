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
		<div className="flex flex-col gap-1 px-3 py-2 items-center w-full h-full">
			<div className="flex items-center justify-between w-full">
				<p className="flex items-center justify-center p-2 font-bold bg-white rounded-lg drop-shadow-lg">Plans</p>
				<Link href={`/admin/newPlan`} className="bg-white rounded-lg drop-shadow-lg">
					<Icon icon={"mdi:plus"} className="text-green-500 text-4xl" />
				</Link>
			</div>
			<div className="flex flex-col gap-2 w-full">
				{plans.map((e, i) => (
					<Link
						href={`/admin/plans/${e._id}`}
						key={i}
						className="flex p-2 items-start justify-between bg-white drop-shadow-lg rounded-lg"
					>
						<p className="text-lg font-bold">{e.name}</p>
						<p className="text-lg font-bold">{e.price - e.discount}₹</p>
						<p className={`text-lg font-bold ${e.active? "text-green-500" :"text-red-500"}`}>{e.active ? "listed" : "hidden"}</p>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Plans
