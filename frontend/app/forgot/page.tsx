"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import api, { handleAxiosError } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
	email: z.string().email({ message: "please ender a valid email" })
})

type formType = z.infer<typeof formSchema>

const Forgot = () => {

	const { register, formState: { errors }, handleSubmit } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const onSubmit = async (body: formType) => {
		try {
			const { data } = await api.post(`/auth/vendor/forgot`, body)
			if (data.success) {
				router.push("/login")
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
					<p className="text-2xl font-bold">Forgot Password</p>
					<p className="text-custom-gray text-wrap">please enter your email</p>
					<form
						className="flex flex-col gap-2"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							{...register("email")}
							placeholder="Email"
							type="text"
							className="outline-none border-2 border-primary px-3 py-1 rounded-lg"
						/>
						{errors.email && <p className="text-red-500">{errors.email.message}</p>}
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

export default Forgot
