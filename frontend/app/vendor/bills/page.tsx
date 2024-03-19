"use client"
import React, { useEffect, useState } from 'react'
import BillInterface from 'types/bill.interface'
import { useStaff } from '@/context/staffContext'
import { toast } from 'sonner'
import { handleAxiosError } from '@/lib/api'
import { Separator } from '@/components/shadcn/Seperator'
import moment from 'moment'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import { vendorApi } from '@/lib/vendorApi'

const Bills = () => {

	const [bills, setBills] = useState<BillInterface[]>([])

	// useEffect(() => {
	// 	vendorApi.get(`/bill/shop/`)
	// 		.then(({ data }) => {
	// 			if (data.success) {
	// 				setBills(data.bills)
	// 			} else {
	// 				toast.error(data.message)
	// 			}
	// 		})
	// 		.catch(error => {
	// 			handleAxiosError(error)
	// 		})
	// }, [])

	const deleteBill = async (billId: string) => {
		try {
			const { data } = await vendorApi.delete(`/bill/${billId}`)
			if (data.success) {
				setBills((prev) => [...prev].filter((e) => e._id != billId))
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className='flex flex-col gap-5 p-5 bg-white rounded-lg drop-shadow-lg w-full h-full'>
			<div className='text-3xl font-bold'>Bills</div>
			<div className='flex flex-col w-full'>

				<div className='flex flex-col w-full'>
					<div className='flex w-full text-custom-light-gray'>
						<p className='w-full'>no</p>
						<p className='w-full'>date</p>
						<p className='w-full'>no of items</p>
						<p className='w-full'>before discount</p>
						<p className='w-full'>discount</p>
						<p className='w-full'>total</p>
						<p className='w-full'></p>
					</div>
					<Separator orientation='horizontal' className='bg-custom-light-gray' />
				</div>

				{bills.map((e, i) => (
					<Link
						href={`/staff/bills/${e._id}`}
						key={i}
						className='flex flex-col w-full'
					>
						<div className='flex items-center py-2 w-full'>
							<p className='w-full'>{i + 1}</p>
							<p className='w-full'>{moment(e.createdAt).format("DD/MM/YYYY")}</p>
							<p className='w-full'>{e.products.length}</p>
							<p className='w-full'>{e.total}</p>
							<p className='w-full'>{e.discount}</p>
							<p className='w-full'>{e.totalAtfterDiscount}</p>
							<button onClick={(event) => { event.preventDefault(); deleteBill(e._id) }} className='w-full'>
								<Icon icon={"mdi:trash"} className='text-red-500 text-2xl' />
							</button>
						</div>
						<Separator orientation='horizontal' className='bg-custom-light-gray' />
					</Link>
				))}
			</div>
		</div>
	)
}

export default Bills

