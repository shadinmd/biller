import { FormEvent, ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../shadcn/Dialog'
import api, { handleAxiosError } from '@/lib/api'
import { toast } from 'sonner'

interface Props {
	children: ReactNode
}

const NewShop = ({ children }: Props) => {
	const [open, setOpen] = useState(false)
	const [name, setName] = useState("")

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const { data } = await api.post("/shop", { name })
			if (data.success) {
				toast.success(data.message)
				setOpen(false)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className='outline-none'>
				{children}
			</DialogTrigger>
			<DialogContent className='bg-white'>
				<DialogHeader>
					<DialogTitle>
						New shop
					</DialogTitle>
					<DialogDescription>
						create a new shop
					</DialogDescription>
				</DialogHeader>
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
			</DialogContent>
		</Dialog>
	)
}

export default NewShop
