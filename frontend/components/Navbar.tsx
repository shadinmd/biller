"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {

	const pathname = usePathname()

	return (
		<header className="flex items-center justify-between w-full  py-5 px-20">
			<p className="-tracking-widest text-4xl font-extrabold">Biller</p>
			<div className="flex font-extrabold items-center gap-10">
				<div className="flex flex-col items-center justify-center">
					<Link href={"/"}>Home</Link>
					{pathname == "/" && <span className="bg-primary rounded-full w-[40px] h-[4px]"></span>}
				</div>
				<div className="flex flex-col items-center justify-center">
					<Link href={"/plans"}>Plans</Link>
					{pathname == "/plans" && <span className="bg-primary rounded-full w-[40px] h-[4px]"></span>}
				</div>
				<div className="flex flex-col items-center justify-center">
					<Link href={"/about"}>About</Link>
					{pathname == "/about" && <span className="bg-primary rounded-full w-[40px] h-[4px]"></span>}
				</div>
			</div>
			<Link href={"/login"} className="bg-primary text-white outline-none font-bold py-3 px-6 rounded-full">
				Get Started
			</Link>
		</header>
	)
}

export default Navbar
