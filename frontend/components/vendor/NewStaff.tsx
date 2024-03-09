import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../shadcn/Dialog"
import api, { handleAxiosError } from "@/lib/api"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
	children: ReactNode,
	shopId: string
}

const formSchema = z.object({

})

type formType = z.infer<typeof formSchema>

const NewStaff = ({ children, shopId }: Props) => {

	const [open, setOpen] = useState(false)
	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const onSubmit = async (data: formType) => {
		try {
			const response = await api.post("/staff", { shopId, ...data })
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="outline-none">
				{children}
			</DialogTrigger>
			<DialogContent>

			</DialogContent>
		</Dialog>
	)
}

export default NewStaff
