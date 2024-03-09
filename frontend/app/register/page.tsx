"use client"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import api, { handleAxiosError } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	username: z.string(),
	email: z.string(),
	password: z.string(),
	confirmPassword: z.string()
})

type formType = z.infer<typeof formSchema>
type className = string

const inputStyle: className = "border-2 rounded-lg py-2 px-3 border-primary"

const Register = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const onSubmit = async (data: formType) => {
		try {
			const response = await api.post("/auth/vendor/register", data)
			if (response.data.success) {
				console.log(response.data.message)
				router.push("/login")
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className='flex flex-col w-screen h-screen bg-custom-offwhite'>
			<Navbar />
			<div className='flex items-center justify-center w-full h-full'>
				<div className='flex flex-col items-center gap-10 bg-white p-10 rounded-lg drop-shadow-lg'>
					<p className='text-5xl font-bold'>Register</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col items-center gap-3'
					>
						<input
							{...register("username")}
							placeholder='Username'
							type="text"
							className={inputStyle}
						/>
						{errors.username && <p className='text-red-500'>{errors.username.message}</p>}
						<input
							{...register("email")}
							placeholder='Email'
							type="text"
							className={inputStyle}
						/>
						{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
						<input
							{...register("password")}
							placeholder='Password'
							type="password"
							className={inputStyle}
						/>
						{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
						<input
							{...register("confirmPassword")}
							placeholder='Confirm password'
							type="password"
							className={inputStyle}
						/>
						{errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
						<button type='submit' className='px-6 py-2 font-bold text-white bg-primary rounded-lg'>
							Register
						</button>
					</form>
					<Link href={"/login"} className='text-custom-light-gray' >All ready have an account? <span className='text-black'>Login here</span></Link>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Register
