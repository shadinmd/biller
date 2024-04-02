"use client"

import { handleAxiosError } from "@/lib/api"
import { adminApi } from "@/lib/adminApi"
import cn from "@/lib/cn"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import PlanInterface from "types/plan.interface"
import { z } from "zod"

interface Props {
	params: {
		id: string
	}
}

const formSchema = z.object({
	name: z.string().min(1, { message: "this field cannot be empty" }),
	description: z.string().min(1, { message: "please provide a catchy description" }),
	price: z.number().min(1, { message: "this value cannot be zero" }),
	discount: z.number(),
	active: z.boolean(),
	productLimit: z.number().min(1, { message: "this value cannot be zero" }),
	billLimit: z.number().min(1, { message: "this value cannot be zero" }),
	shopLimit: z.number().min(1, { message: "this value cannot be zero" })
})

type formType = z.infer<typeof formSchema>
type formFields = keyof formType

const EditPlan = ({ params }: Props) => {

	const [plan, setPlan] = useState<PlanInterface>()

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchema) })

	const inputStyle = (name: formFields) => {
		return cn("border-2 border-primary rounded-lg px-3 py-1	outline-none", errors[name] ? "border-red-500 placeholder:text-red-500 text-red-500" : "")
	}

	useEffect(() => {
		adminApi.get(`/admin/plan/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					console.log(data.plan)
					setPlan(data.plan)
				} else {
					toast.error(data.message)
				}
			})
			.catch((error) => {
				handleAxiosError(error)
			})
	}, [params.id])

	const onSubmit = async (data: formType) => {
		try {
			const response = await adminApi.put(`/admin/plan/${params.id}`, { ...data, _id: params.id })

			if (response.data.success) {
				toast.success(response.data.message)
				console.log(response.data)
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center bg-white rounded-lg drop-shadow-lg w-full h-full">
			<p className="text-3xl">{plan?.name}</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex items-center gap-5 w-full'
			>
				<div className='flex flex-col items-center w-full h-full gap-5'>
					<InputContainer name='Name' error={errors.name?.message}>
						<input
							id='name'
							{...register("name")}
							defaultValue={plan?.name}
							placeholder='Name'
							type="text"
							className={inputStyle("name")}
						/>
					</InputContainer>
					<InputContainer name='Description' error={errors.description?.message}>
						<input
							{...register("description")}
							defaultValue={plan?.description}
							placeholder='Descrptrion'
							type="text"
							className={inputStyle("description")}
						/>
					</InputContainer>
					<InputContainer name='Price' error={errors.price?.message}>
						<input
							{...register("price", { valueAsNumber: true })}
							placeholder='Price'
							defaultValue={plan?.price}
							type="number"
							className={inputStyle("price")}
						/>
					</InputContainer>
					<InputContainer name='Discount' error={errors.discount?.message}>
						<input
							{...register("discount", { valueAsNumber: true })}
							placeholder='Discount'
							defaultValue={plan?.discount}
							type="number"
							className={inputStyle("discount")}
						/>
					</InputContainer>
				</div>
				<div className='flex flex-col items-center w-full h-full gap-5'>
					<InputContainer name='Product limit' error={errors.productLimit?.message}>
						<input
							{...register("productLimit", { valueAsNumber: true })}
							placeholder='Product limit'
							defaultValue={plan?.productLimit}
							type="number"
							className={inputStyle("productLimit")}
						/>
					</InputContainer>
					<InputContainer name='Bill Limit' error={errors.billLimit?.message}>
						<input
							{...register("billLimit", { valueAsNumber: true })}
							placeholder='Staff limit'
							defaultValue={plan?.billLimit}
							type="number"
							className={inputStyle("billLimit")}
						/>
					</InputContainer>
					<InputContainer name='shop Limit' error={errors.shopLimit?.message} >
						<input
							{...register("shopLimit", { valueAsNumber: true })}
							placeholder='Shop Limit'
							defaultValue={plan?.shopLimit}
							type="number"
							className={inputStyle("shopLimit")}
						/>
					</InputContainer>
					<InputContainer name='active' error={errors.active?.message}>
						<input
							{...register("active")}
							defaultChecked={plan?.active}
							placeholder=''
							type="checkbox"
							className={inputStyle("active")}
						/>
					</InputContainer>
					<button className='bg-primary text-white self-end px-6 py-2 font-bold rounded-lg'>
						Save
					</button>
				</div>
			</form >
		</div>
	)
}

const InputContainer = ({ children, name, error }: { name: string, children: ReactNode, error: string | undefined }) => {
	return (
		<div className='flex flex-col'>
			<div className='flex gap-5'>
				<label>{[name[0].toUpperCase(), name.slice(1, name.length)]}: </label>
				{children}
			</div>
			{error && <p className='text-red-500'>{error}</p>}
		</div>
	)
}
export default EditPlan
