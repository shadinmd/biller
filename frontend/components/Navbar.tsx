"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const Navbar = () => {

	const pathname = usePathname()
	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		if (localStorage.getItem("vendor-token"))
			setLoggedIn(true)
	}, [])

	return (
		<header className="flex items-center justify-between w-full  py-5 px-10 sm:px-20">
			<p className="-tracking-widest text-4xl font-extrabold">Biller</p>
			<div className="font-extrabold items-center gap-10 hidden sm:flex">
				<div className="flex flex-col items-center justify-center">
					<Link href={"/"}>Home</Link>
					{pathname == "/" && <span className="bg-primary rounded-full w-[40px] h-[4px]"></span>}
				</div>
				<div className="flex flex-col items-center justify-center">
					<Link href={"/plans"}>Plans</Link>
					{pathname == "/plans" && <span className="bg-primary rounded-full w-[40px] h-[4px]"></span>}
				</div>
				<div className="flex flex-col items-center justify-center">
					<Link href={"/download"}>Download</Link>
					{pathname == "/download" && <span className="bg-primary rounded-full w-[40px] h-[4px]"></span>}
				</div>
			</div>
			<div className="flex items-center gap-5">
				<Link href={"/staff/login"} className="text-primary outline-none font-bold">
					Staff Login
				</Link>
				<Link href={loggedIn ? "/vendor" : "/login"} className="bg-primary text-white outline-none font-bold py-3 px-6 rounded-full">
					Get Started
				</Link>
			</div>
		</header>
	)
}

export default Navbar
