"use client"
import { useRouter } from "next/navigation"

const Settings = () => {

	const router = useRouter()

	const logout = () => {
		localStorage.removeItem("vendor-token")
		router.push("/login")
	}

	return (
		<div className="flex items-center justify-center w-full h-full bg-white rounded-lg drop-shadow-lg">
			<button onClick={() => logout()} className="bg-red-500 px-6 py-2 text-white font-bold rounded-full">
				Logot
			</button>
		</div>
	)
}

export default Settings
