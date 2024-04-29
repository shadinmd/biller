"use client"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useVendor } from '@/context/vendorContext'
import api, { handleAxiosError } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchemma = z.object({
	email: z.string().email({ message: "Please enter a valid email" }),
	password: z.string().min(1, { message: "this field cannot be empty" })
})

type formType = z.infer<typeof formSchemma>

const Login = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchemma) })
	const router = useRouter()
	const { fetchVendorDetails } = useVendor()

	const onSubmit = async (data: formType) => {
		try {
			const response = await api.post("/auth/vendor/login", data)
			if (response.data.success) {
				localStorage.setItem("vendor-token", response.data.token)
				fetchVendorDetails()
				router.push("/vendor")
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
			<div className='flex flex-col items-center justify-center w-full h-full'>
				<div className='flex flex-col items-center bg-white gap-10 p-10 rounded-lg drop-shadow-lg'>
					<p className='text-5xl font-bold'>Login</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-3 items-center'
					>
						<input
							{...register("email")}
							placeholder='Email'
							type="text"
							className={`px-3 py-1 border-2 ${errors.email ? "border-red-500 placeholder:text-red-500" : "border-primary"} rounded-lg outline-none`}
						/>
						{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
						<input
							{...register("password")}
							placeholder='Password'
							type="password"
							className={`px-3 py-1 border-2 ${errors.password ? "border-red-500 placeholder:text-red-500" : "border-primary"} rounded-lg outline-none`}
						/>
						<Link href={"/forgot"} className='text-custom-light-gray' >forgot password <span className='text-black'>click here</span></Link>
						{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
						<button className='text-white bg-primary rounded-lg font-bold px-6 py-2'>
							Login
						</button>
					</form>
					<Link href={"/register"} className='text-custom-light-gray' >Allready have an account? <span className='text-black'>Register here</span></Link>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Login
