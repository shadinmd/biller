import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Link from "next/link"

const Page = () => {
	return (
		<div className="flex flex-col items-center justify-start w-screen h-[200vh] bg-custom-offwhite">
			<Navbar />
			<div className="flex items-center justify-center w-full p-20">
				<div className="flex flex-col w-full items-start text-black gap-5">
					<p className="text-5xl">We Provide easy<br /> solution for your</p>
					<p className="text-4xl font-extrabold">Billing needs</p>
					<p className="text-xl">biller is a safe and easy to use application for <br /> managing bills and products for your buisness </p>
					<Link href={"/login"} className="bg-primary text-white outline-none font-bold py-4 px-8 rounded-full">
						Get Started
					</Link>
				</div>
				<div className="w-full h-full">
					<img src="/hero-1.png" alt="hero 1 image" />
				</div>
			</div>
			<div className="flex flex-col items-center w-full py-10 bg-custom-offwhite">
				<p></p>
				<div className="flex gap-10 justify-between">
					<div className="flex flex-col items-start p-16 rounded-lg shadow-2xl bg-white text-black">
						<div className="h-full flex flex-col items-start">
							<p>Mobile</p>
							<p>Responsive</p>
						</div>
						<div className="h-full w-full">

						</div>
					</div>
					<div className="flex flex-col items-start p-16 rounded-lg shadow-2xl bg-white text-black">
						<p>24/7</p>
						<p>Support</p>
					</div>
					<div className="flex flex-col items-start p-16 rounded-lg shadow-2xl bg-white text-black">
						<p>Manage</p>
						<p>Everything</p>
					</div>
					<div className="flex flex-col items-start p-16 rounded-lg shadow-2xl bg-white text-black">
						<p>Online data</p>
						<p>Backup</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Page
