"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import api, { handleAxiosError } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
	password: z.string().refine(val => !val.includes(" "), { message: "password must not contain space" }),
	confirmPassword: z.string().min(1, { message: "this field cannot be empty" })
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password != confirmPassword) {
		ctx.addIssue({
			code: "custom",
			path: ["confirmPassword"],
			message: "passwords don't match"
		})
	}
})

type formType = z.infer<typeof formSchema>

const Reset = () => {

	const token = useSearchParams().get("token")
	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const onSubmit = async (body: formType) => {
		try {
			const { data } = await api.post(`/auth/vendor/reset`, { ...body, token })
			if (data.success) {
				router.push("/login")
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className="flex flex-col h-screen w-full">
			<Navbar />
			<div className="flex items-center justify-center h-full w-full">
				<div className="flex gap-5 flex-col items-center bg-white rounded-lg drop-shadow-lg p-5">
					<p className="text-2xl font-bold">Reset Password</p>
					<form
						className="flex flex-col gap-2"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							{...register("password")}
							placeholder="Password"
							type="password"
							className="outline-none border-2 border-primary px-3 py-1 rounded-lg"
						/>
						{errors.password && <p className="text-red-500">{errors.password.message}</p>}
						<input
							{...register("confirmPassword")}
							placeholder="Confirm Password"
							type="password"
							className="outline-none border-2 border-primary px-3 py-1 rounded-lg"
						/>
						{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
						<button type="submit" className="bg-primary text-white font-bold rounded-lg py-2">
							Reset
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Reset
