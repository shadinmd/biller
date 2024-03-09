"use client"
import { useRouter } from "next/navigation"

const Settings = () => {

	const router = useRouter()

	const logout = () => {
		localStorage.removeItem("staff-token")
		router.push("/staff/login")
	}

	return (
		<div className="flex items-center justify-center bg-white rounded-lg drop-shadow-lg w-full h-full">
			<button onClick={() => logout()} className="py-2 px-6 rounded-full bg-red-500 font-bold text-white">
				logout
			</button>
		</div>
	)
}

export default Settings
