"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import api, { handleAxiosError } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ScaleLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
	email: z.string().email({ message: "Enter a valid email" })
})

type formType = z.infer<typeof formSchema>

const Verify = () => {

	const token = useSearchParams().get("token")
	const router = useRouter()

	const [loading, setLoading] = useState(true)

	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })

	useEffect(() => {
		if (token)
			api.post("/auth/vendor/verify", { token })
				.then(({ data }) => {
					if (data.success) {
						if (localStorage.getItem("token"))
							router.push("/vendor")
						else
							router.push("/login")
					} else {
						toast.error(data.message)
						setLoading(false)
					}
				})
				.catch((error) => {
					setLoading(false)
					handleAxiosError(error)
				})
		else {
			setLoading(false)
		}
	}, [token, router])

	const onSubmit = async (body: formType) => {
		try {
			const { data } = await api.post("/auth/vendor/sendOtp", body)
			if (data.success) {
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center flex-col h-screen w-screen">
				<ScaleLoader />
			</div>
		)
	}

	return (
		<div className="flex items-center flex-col h-screen w-screen">
			<Navbar />
			<div className="flex items-center justify-center h-full w-full">
				<div className="flex flex-col gap-5 items-center justify-center p-5 bg-white rounded-lg drop-shadow-lg">
					<div className="flex items-center w-full flex-col gap-2">
						<p className="font-bold text-4xl">Verify</p>
						<p className="text-custom-light-gray">please verify your email by clicking <br /> on the verificatin link send to this email</p>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-2"
					>
						<input
							{...register("email")}
							placeholder=""
							type="text"
							className="border-2 border-primary outline-none px-3 py-1 rounded-lg"
						/>
						{errors.email && <p className="text-red-500">{errors.email.message}</p>}
						<button type="submit" className="bg-primary font-bold text-white rounded-lg px-6 py-2">
							Resend
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Verify
