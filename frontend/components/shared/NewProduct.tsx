import { handleAxiosError } from "@/lib/api"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/Dialog"
import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import ProductInterface from "types/product.interface"
import { AxiosInstance } from "axios"

interface Props {
	children: ReactNode,
	shopId: string,
	newProduct: (product: ProductInterface) => void,
	api: AxiosInstance
}

const formSchema = z.object({
	name: z.string().min(1, { message: "this field cannot be empty" }),
	barcode: z.string().min(1, { message: "this field cannot be empty" }).refine(val => !val.includes(" "), { message: "barcode must not contain spaces" }),
	price: z.number().nonnegative({ message: "price cannot be negative" }),
	profit: z.number().nonnegative({ message: "profit cannot be negative" }),
	point: z.number().nonnegative({ message: "point cannot be negative" })
}).superRefine(({ profit, price }, ctx) => {
	if (profit > price) {
		ctx.addIssue({
			code: "custom",
			path: ["profit"],
			message: "profit cannot be higher than price"
		})
	}
})

type formType = z.infer<typeof formSchema>
type className = string

const inputStyle: className = "border-2 border-primary px-3 py-1 rounded-lg outline-none"

const NewProduct = ({ children, shopId, newProduct, api }: Props) => {

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			barcode: "",
			price: 0,
			profit: 0,
			point: 0
		}
	})
	const [open, setOpen] = useState(false)

	const onSubmit = async (data: formType) => {
		try {
			const response = await api.post("/product", { shopId, ...data })
			if (response.data.success) {
				toast.success(response.data.message)
				newProduct(response.data.product)
				setOpen(false)
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="outline-none">
				{children}
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>
						New Product
					</DialogTitle>
					<DialogDescription>
						create a new product in this shop
					</DialogDescription>
				</DialogHeader>
				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col items-center gap-2"
					>
						<div className="flex gap-3 items-center">
							<p>Name: </p>
							<input
								{...register("name")}
								placeholder="Name"
								type="text"
								className={inputStyle}
							/>
						</div>
						{errors.name && <p className="text-red-500">{errors.name.message}</p>}

						<div className="flex gap-3 items-center">
							<p>Barcode: </p>
							<input
								{...register("barcode")}
								placeholder="Barcode"
								type="text"
								className={inputStyle}
							/>
						</div>
						{errors.barcode && <p className="text-red-500">{errors.barcode.message}</p>}

						<div className="flex gap-3 items-center">
							<p>Price: </p>
							<input
								{...register("price", { valueAsNumber: true })}
								placeholder="Price"
								type="text"
								className={inputStyle}
							/>
						</div>
						{errors.price && <p className="text-red-500">{errors.price.message}</p>}
						<div className="flex gap-3 items-center">
							<p>Profit: </p>
							<input
								{...register("profit", { valueAsNumber: true })}
								placeholder="Profit"
								type="text"
								className={inputStyle}
							/>
						</div>
						{errors.profit && <p className="text-red-500">{errors.profit.message}</p>}
						<div className="flex gap-3 items-center">
							<p>Point: </p>
							<input
								{...register("point", { valueAsNumber: true })}
								placeholder="Point"
								type="text"
								className={inputStyle}
							/>
						</div>
						{errors.point && <p className="text-red-500">{errors.point.message}</p>}
						<button className="font-bold text-white bg-primary px-6 py-2 rounded-full" type="submit">
							Create
						</button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default NewProduct
