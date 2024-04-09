"use client"
import { Separator } from '@/components/shadcn/Seperator'
import EditBill from '@/components/shared/EditBill'
import { useStaff } from '@/context/staffContext'
import { handleAxiosError } from '@/lib/api'
import { staffApi } from '@/lib/staffApi'
import { Icon } from '@iconify/react/dist/iconify.js'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import BillInterface from 'types/bill.interface'
import ProductInterface from 'types/product.interface'

interface Props {
	params: {
		id: string
	}
}

interface CompleteBillInterface extends Omit<BillInterface, "products"> {
	products: ({ product: ProductInterface, quantity: number })[]
}

const BillView = ({ params }: Props) => {

	const [bill, setBill] = useState<CompleteBillInterface>()
	const [products, setProducts] = useState<{ product: ProductInterface, quantity: number }[]>([])
	const router = useRouter()

	useEffect(() => {
		staffApi.get(`/bill/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					setBill(data.bill)
					setProducts(data.bill.products)
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

	const saveBill = useCallback(async () => {
		try {
			const productsSerialized = products.map(e => ({ product: e.product._id, quantity: e.quantity }))
			const { data } = await staffApi.put(`/bill/${bill?._id}`, { products: productsSerialized })
			if (data.success) {
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}, [products, bill?._id])

	const deleteProduct = (id: string) => {
		let temp = [...products].filter(e => e.product._id != id)
		setProducts(temp)
	}

	const setProductQuantity = (id: string, quantity: number) => {
		try {
			let temp = [...products]
			let product = temp.find(e => e.product._id == id)
			if (!product) {
				toast.error("faled to edit quantity")
				return
			}
			product.quantity = quantity
			setProducts(temp)
		} catch (error) {
			handleAxiosError(error)
		}
	}

	const cancelEditing = () => {
		setProducts(bill?.products!)
	}

	return (
		<div className='flex flex-col p-5 gap-5 bg-white rounded-lg drop-shadow-lg h-full w-full'>
			<div className='flex w-full justify-between'>
				<p className='text-3xl font-bold'>Bill</p>
				<div className='flex gap-2 items-center font-bold text-white'>
					<button onClick={e => { e.preventDefault(); cancelEditing() }} className='bg-red-500 rounded-lg px-2 py-1'>
						Cancel
					</button>
					<button onClick={e => { e.preventDefault(); saveBill() }} className='bg-primary rounded-lg px-2 py-1'>
						Save
					</button>
				</div>
			</div>
			<div className='flex flex-col items-start'>
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
			<div className='flex flex-col'>
				<div className='flex flex-col items-center w-full'>
					<div className='flex text-custom-light-gray items-center w-full'>
						<p className='w-full'>Name</p>
						<p className='w-full'>Qty</p>
						<p className='w-full'>Price</p>
						<p className='w-full'>Total</p>
						<p className='w-full'></p>
					</div>
					<Separator orientation='horizontal' className='w-full bg-custom-light-gray opacity-55' />
				</div>
				{
					products.map((e, i) => (
						<div
							key={i}
							className='flex flex-col w-full'
						>
							<div className='flex w-full h-10 items-center'>
								<p className='w-full'>{e.product?.name}</p>
								<p className='w-full'>{e.quantity}</p>
								<p className='w-full'>{e.product?.price}</p>
								<p className='w-full'>{e.product?.price * e.quantity}</p>
								<div className='flex items-center justify-evenly w-full'>
									<EditBill product={e.product} quantity={e.quantity} setProductQuantity={setProductQuantity}>
										<Icon icon={"mdi:pencil"} className='text-xl' />
									</EditBill>
									<Icon onClick={ev => { ev.preventDefault(); deleteProduct(e.product._id) }} icon={"mdi:trash"} className='text-xl text-red-500 cursor-pointer' />
								</div>
							</div>
							<Separator orientation='horizontal' className='w-full bg-custom-light-gray opacity-55' />
						</div>
					))
				}
			</div>
		</div>
	)
}

export default BillView

