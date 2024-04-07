"use client"
import { FormEvent, useState } from 'react'
import { handleAxiosError } from '@/lib/api'
import { toast } from 'sonner'
import { vendorApi } from '@/lib/vendorApi'
import { useRouter } from 'next/navigation'

const NewShop = () => {

	const router = useRouter()
	const [name, setName] = useState("")

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const { data } = await vendorApi.post("/shop", { name })
			if (data.success) {
				toast.success(data.message)
				router.push("/vendor")
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className='flex flex-col gap-5 items-center justify-center w-full h-full bg-white  rounded-lg drop-shadow-lg'>
			<div className='flex flex-col'>
				<p className='text-4xl font-bold'>
					Create your shop
				</p>
			</div>
			<div className='flex flex-col items-center'>
				<form onSubmit={onSubmit} className='flex flex-col items-center gap-2'>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Name'
						type="text"
						className='border-2 border-primary rounded-lga px-3 py-1 rounded-lg outline-none'
					/>
					<button className='bg-primary text-white font-bold px-6 py-2 rounded-lg'>
						Create
					</button>
				</form>
			</div>
		</div>
	)
}

export default NewShop

