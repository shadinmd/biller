"use client"
import api, { handlAxiosError } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
	username: z.string().min(1, { message: "please fill this field" }),
	password: z.string().min(1, { message: "please fill this filed" })
})

type formType = z.infer<typeof formSchema>

const Login = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<formType>({ resolver: zodResolver(formSchema) })
	const router = useRouter()

	const submit = async (data: formType) => {
		try {
			const response = await api.post("/auth/admin/login", data)
			if (response.data.success) {
				localStorage.setItem("admin-token", response.data.token)
				router.push("/admin")
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			handlAxiosError(error)
		}
	}

	return (
		<div className="flex items-center justify-center bg-custom-offwhite h-screen w-screen">
			<div className="flex flex-col gap-5 items-center bg-white rounded-lg p-10">
				<p className="text-4xl font-bold">Admin</p>
				<form
					onSubmit={handleSubmit(submit)}
					className="flex flex-col gap-2 items-center"
				>
					<input
						{...register("username")}
						placeholder="Username"
						type="text"
						className={`border-2 ${errors.username ? "border-red-500" : "border-primary"}  rounded-lg px-3 py-1 outline-none`}
					/>
					{errors.username && <p className="text-red-500">{errors.username.message}</p>}
					<input
						{...register("password")}
						placeholder="Password"
						type="password"
						className={`border-2 ${errors.password ? "border-red-500" : "border-primary"} rounded-lg px-3 py-1 outline-none`}
					/>
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
					<button type="submit" className="px-6 py-2 text-white font-bold bg-primary rounded-lg">
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
