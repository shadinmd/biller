import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Link from "next/link"

const Page = () => {
	return (
		<div className="flex flex-col items-center justify-start w-screen bg-custom-offwhite">
			<Navbar />
			<div className="flex items-center justify-center w-full p-10 sm:p-20">
				<div className="flex flex-col w-full items-start text-black gap-5">
					<p className="text-2xl sm:text-5xl">We Provide easy<br /> solution for your</p>
					<p className="text-xl sm:text-4xl font-extrabold">Billing needs</p>
					<p className="text-xl">biller is a safe and easy to use application for <br /> managing bills and products for your buisness </p>
					<Link href={"/login"} className="bg-primary text-white outline-none font-bold py-4 px-8 rounded-full">
						Get Started
					</Link>
				</div>
				<div className="hidden sm:block w-full h-full">
					<img src="/hero-1.png" alt="hero image 1" />
				</div>
			</div>
			<div className="flex flex-col gap-10 items-center w-full py-10 bg-custom-offwhite">
				<p className="text-primary font-bold text-xl">Discover the key features</p>
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
			<div className="flex gap-5 items-center justify-center p-20">
				<div className="w-full h-full">
					<p className="text-4xl font-extrabold text-primary">Manage everything on the go</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, expedita? Aspernatur, explicabo aliquam voluptates nemo harum facilis quisquam, repudiandae fuga earum rem dolorum cum, quia odio fugiat commodi placeat aperiam!</p>
					<button className="bg-primary px-6 py-2 text-white rounded-full">Get started</button>
				</div>
				<div className="w-full h-full hidden sm:block">
					<img src="/hero-2.png" alt="hero image 2" />
				</div>
			</div>
			<div className="flex gap-5 items-center justify-center p-20">
				<div className="w-full h-full hidden sm:block">
					<img src="/hero-3.png" alt="hero image 3" />
				</div>
				<div className="flex flex-col gap-4 items-start justify-center w-full h-full">
					<p className="text-4xl font-extrabold text-primary">Manage everything on the go</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, expedita? Aspernatur, explicabo aliquam voluptates nemo harum facilis quisquam, repudiandae fuga earum rem dolorum cum, quia odio fugiat commodi placeat aperiam!</p>
					<button className="bg-primary px-6 py-2 text-white rounded-full">Get started</button>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Page
