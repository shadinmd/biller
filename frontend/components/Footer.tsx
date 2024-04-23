"use client"
import Link from "next/link"
import { Icon } from "@iconify/react"

const Footer = () => {
	return (
		<footer className="flex items-center justify-between justify-self-end bg-[#151515] text-white w-full">
			<div className="flex flex-col px-20 py-10 w-full text-custom-gray">
				<p className="-tracking-widest font-extrabold text-2xl text-white ">Biller</p>
				<p>
					biller is a safe and easy to use application for <br /> managing bills and products for your buisness
				</p>
				<div className="flex gap-3 p-2">
					<Link href="https://www.linkedin.com/in/shadin-muhammed-69b004256/">
						<Icon icon={"mdi:linkedin"} className="text-xl" />
					</Link>
					<Link href="https://github.com/shadinmhd">
						<Icon icon={'mdi:github'} className="text-xl" />
					</Link>
				</div>
			</div>
			<div className="w-full">

			</div>
			<div className="flex flex-col gap-5 w-full text-custom-gray">
				<p className="text-white">Contact</p>
				<div className="flex flex-col">
					<p>+91 85889908075</p>
					<p>shadinmhd98@gmail.com</p>
					<p>673572</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
