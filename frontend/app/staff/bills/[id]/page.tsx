"use client"
import { handleAxiosError } from '@/lib/api'
import { staffApi } from '@/lib/staffApi'
import { Icon } from '@iconify/react/dist/iconify.js'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import BillInterface from 'types/bill.interface'

interface Props {
	params: {
		id: string
	}
}

const BillView = ({ params }: Props) => {

	const [bill, setBill] = useState<BillInterface>()
	const router = useRouter()

	useEffect(() => {
		staffApi.get(`/bill/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					setBill(data.bill)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [params.id])

	const deleteBill = useCallback(async () => {
		if (bill?._id) {
			try {
				const { data } = await staffApi.delete(`/bill/${bill?._id}`)
				if (data.success) {
					router.back()
					toast.success(data.message)
				} else {
					toast.error(data.message)
				}
			} catch (error) {
				handleAxiosError(error)
			}
		} else {
			toast.error("something went wrong")
		}
	}, [bill, router])

	return (
		<div className='flex flex-col p-5 gap-5 bg-white rounded-lg drop-shadow-lg h-full w-full'>
			<div className='flex w-full justify-between'>
				<p className='text-3xl font-bold'>Bill</p>
				<div>
					<button onClick={(e) => { e.preventDefault(); deleteBill() }}>
						<Icon icon={"mdi:trash"} className='text-red-500 text-2xl' />
					</button>
				</div>
			</div>
			<div className='flex flex-col'>
				<div className='flex gap-5'>
					<p>Date: </p>
					<p>{moment(bill?.createdAt).format("DD/MM/YYYY")}</p>
				</div>
				<div className='flex gap-5'>
					<p>No of items: </p>
					<p>{bill?.products.length}</p>
				</div>
				<div className='flex gap-5'>
					<p>Total mrp: </p>
					<p>{bill?.total}</p>
				</div>
				<div className='flex gap-5'>
					<p>Discount: </p>
					<p>{bill?.discount}</p>
				</div>
				<div className='flex gap-5'>
					<p>Total: </p>
					<p>{bill?.totalAtfterDiscount}</p>
				</div>
			</div>
		</div>
	)
}

export default BillView
