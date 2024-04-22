"use client"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { handleAxiosError } from '@/lib/api'
import { vendorApi } from '@/lib/vendorApi'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'
import { toast } from 'sonner'
import PlanInterface from 'types/plan.interface'

interface Props {
	params: {
		id: string
	}
}

const Subscribe = ({ params }: Props) => {
	const router = useRouter()
	const today = new Date(Date.now())
	const expiryDate = new Date().setMonth(today.getMonth() + 1)

	const [loading, setLoading] = useState(true)
	const [plan, setPlan] = useState<PlanInterface>({
		_id: "",
		name: "",
		description: "",
		price: 0,
		discount: 0,
		active: false,
		features: [],
		productLimit: 0,
		billLimit: 0,
	})

	useEffect(() => {
		vendorApi.get(`/plan/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					setPlan(data.plan)
				} else {
					toast.error(data.message)
				}
			}).catch(error => {
				handleAxiosError(error)
			}).finally(() => {
				setLoading(false)
			})
	}, [])

	const subscribe = async () => {
		try {
			const { data } = await vendorApi.post("/subscribe", {
				startDate: today,
				expiryDate,
				planId: params.id
			})
			if (data.success) {
				console.log(data.session.url)
				if (data.session.url) {
					router.push(data.session.url)
				}
				else
					toast.error("failed to fetch payment url")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center h-full w-full p-5 rounded-lg bg-white drop-shadow-lg'>
				<ScaleLoader />
			</div>
		)
	}

	return (
		<div className='flex flex-col items-center gap-5 h-screen w-full'>
			<Navbar />
			<div className='flex gap-5 items-center justify-center h-full'>
				<div className='flex flex-col gap-2 items-center h-full w-full font-semibold'>
					<p className='text-3xl font-bold bg-white rounded-lg w-full drop-shadow-lg p-2'>Subscribe</p>
					<div className='flex items-center gap-2 bg-white rounded-lg drop-shadow-lg p-2 w-full'>
						<p>Purchase date: </p>
						<p>{moment(today).local().format("hh:mm A on DD/MM/YYYY")}</p>
					</div>
					<div className='flex items-center gap-2 bg-white rounded-lg drop-shadow-lg p-2 w-full'>
						<p>Expiration date: </p>
						<p>{moment(expiryDate).local().format("hh:mm A on DD/MM/YYYY")}</p>
					</div>
				</div>
				<div className='flex flex-col gap-2 w-full h-full'>
					<PlanCard plan={plan} />
					<button onClick={e => { e.preventDefault(); subscribe() }} className='bg-primary rounded-lg px-6 py-3 font-bold text-white'>
						Subscribe
					</button>
				</div>
			</div>
			<Footer />
		</div>
	)
}

interface CardProps {
	plan: PlanInterface
}

const PlanCard = ({ plan }: CardProps) => {
	return (
		<div className="flex flex-col gap-2 font-semibold bg-white rounded-lg drop-shadow-lg p-5">
			<div className="flex items-center justify-between gap-5 w-full">
				<div className="flex flex-col">
					<p className="text-2xl font-bold">{plan.name}</p>
					<span className="w-full h-1 bg-primary rounded-full"></span>
				</div>
				<div className="flex flex-col items-end">
					<p className="text-3xl font-bold">₹{plan.price - plan.discount}/M</p>
					<p className="font-bold line-through decoration-red-500">₹{plan.price}/M</p>
				</div>
			</div>
			<p className="text-lg break-words font-bold">
				{plan.description}
			</p>
			<ul className="flex list-disc pl-5 font-bold flex-col h-full">
				<li>Max bills: {plan.billLimit}</li>
				<li>Max products: {plan.productLimit}</li>
				<li>24/7 customer support</li>
				<li>online data backup</li>
			</ul>
		</div>
	)

}

export default Subscribe
