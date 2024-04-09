import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/Dialog"
import ProductInterface from "types/product.interface"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
	children: ReactNode,
	product: ProductInterface,
	quantity: number,
	setProductQuantity: (id: string, quantity: number) => void,
	className?: string
}

const formSchema = z.object({
	quantity: z.number().min(1, { message: "quantity cannot be less than 1" })
})

type formType = z.infer<typeof formSchema>

const EditBill = ({ children, product, quantity, className, setProductQuantity }: Props) => {

	const [open, setOpen] = useState(false)
	const { register, handleSubmit, formState: { errors } } = useForm<formType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			quantity
		}
	})

	const onSubmit = (body: formType) => {
		setProductQuantity(product._id, body.quantity)
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				{children}
			</DialogTrigger>
			<DialogContent className="outline-none bg-white">
				<DialogHeader>
					<DialogTitle>
						{product.name}
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-2 items-center"
				>
					<input
						{...register("quantity", { valueAsNumber: true })}
						type="text"
						defaultValue={quantity}
						placeholder="Quantity"
						autoFocus
						className="outline-none border-2 border-primary rounded-lg px-3 py-2"
					/>
					<button type="submit" className="bg-primary text-white font-bold px-3 py-1 rounded-lg">
						Save
					</button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default EditBill
