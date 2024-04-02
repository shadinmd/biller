"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Icon } from "@iconify/react"
import Link from "next/link"

const Success = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen w-full">
			<Navbar />
			<div className="flex items-center justify-center h-full w-full">
				<div className="flex flex-col gap-2 items-center">
					<Icon icon={"ep:success-filled"} className="text-9xl text-green-500" />
					<p className="text-xl font-bold">Payment Successfull</p>
					<Link href={`/vendor`} className="bg-primary rounded-full px-6 py-4 font-bold text-white">
						Countinue {"->"}
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Success
