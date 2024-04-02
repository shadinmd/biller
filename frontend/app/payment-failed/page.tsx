"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchParams } from "next/navigation"

const Success = () => {

	const searchParams = useSearchParams()
	const message = searchParams.get("message")

	return (
		<div className="flex flex-col items-center justify-center h-screen w-full">
			<Navbar />
			<div className="flex items-center justify-center h-full w-full">
				<div className="flex flex-col gap-2 items-center">
					<Icon icon={"ic:round-error"} className="text-red-500 text-9xl" />
					<p className="text-xl font-semibold">{message}</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Success
