"use client"
import api, { handleAxiosError } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	username: z.string().min(5, { message: "enter a valid username" }),
	password: z.string().min(1, { message: "this field cannot be empty" })
})

type formType = z.infer<typeof formSchema>

const Login = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const onSubmit = async (data: formType) => {
		try {
			const response = await api.post("/auth/staff/login", data)
			if (response.data.success) {
				localStorage.setItem("staff-token", response.data.token)
				router.push("/staff")
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className='flex flex-col items-center justify-center w-screen h-screen bg-custom-offwhite'>
			<div className='flex flex-col gap-10 bg-white items-center justify-center p-10 rounded-lg drop-shadow-lg'>
				<div className='flex flex-col '>
					<p className='text-5xl font-bold'>Login</p>
					<p>login page for staff</p>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex items-center flex-col gap-2'
				>
					<input
						{...register("username")}
						placeholder='Username'
						type="text"
						className={`px-3 py-1 border-2 ${errors.username ? "border-red-500 placeholder:text-red-500" : "border-primary"} rounded-lg outline-none`}
					/>
					{errors.username && <p className='text-red-500'>{errors.username.message}</p>}
					<input
						{...register("password")}
						placeholder='Password'
						type="password"
						className={`px-3 py-1 border-2 ${errors.username ? "border-red-500 placeholder:text-red-500" : "border-primary"} rounded-lg outline-none`}
					/>
					{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
					<button type='submit' className='w-full py-2 text-white font-bold bg-primary rounded-lg'>
						Login
					</button>
					<Link href={"/"}>
						not a staff? <span>go back</span>
					</Link>
				</form>
			</div>
		</div>
	)
}

export default Login
