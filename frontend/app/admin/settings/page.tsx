"use client"
import { useRouter } from "next/navigation"

const Settings = () => {

	const router = useRouter()

	const logout = () => {
		localStorage.removeItem("admin-token")
		router.push("/admin/login")
	}

	return (
		<div className="flex items-center justify-center h-full w-full bg-white rounded-lg drop-shadow-lg">
			<button onClick={() => logout()} className="bg-red-500 px-6 py-2 rounded-full font-bold text-white">
				logout
			</button>
		</div>
	)
}

export default Settings
