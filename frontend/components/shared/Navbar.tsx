import { Icon } from "@iconify/react/dist/iconify.js"
import { Sheet, SheetContent, SheetTrigger } from "../shadcn/Sheet"
import { ReactNode } from "react"
import Link from "next/link"

const Navbar = () => {
	return (
		<header className="flex lg:hidden w-full bg-custom-offwhite px-5 pt-5">
			<div className="flex items-center justify-between p-3 w-full h-fit bg-white drop-shadow-lg rounded-lg">
				<p className="text-xl font-extrabold">Biller</p>
				<div>
					<Sidebar>
						<Icon icon={"mdi:menu"} className="text-2xl" />
					</Sidebar>
				</div>
			</div>
		</header>
	)
}

const Sidebar = ({ children }: { children: ReactNode }) => {
	return (
		<Sheet>
			<SheetTrigger className="outline-none">
				{children}
			</SheetTrigger>
			<SheetContent
				side="left"
				className="flex flex-col items-center bg-white"
			>
				<Link href={`/`} className="text-3xl text-primary font-bold md:px-4 md:py-3 w-full flex gap-5 md:pr-16 items-center">
					Biller
				</Link>
				<Link href={`/vendor`} className="bg-white rounded-lg drop-shadow-lg p-4 w-full flex gap-5 items-center">
					<Icon icon={"mdi:home"} className="text-primary text-2xl" />
					<p className="font-semibold text-custom-light-gray">
						Dashboard
					</p>
				</Link>

				<Link href={`/vendor/shops`} className="bg-white rounded-lg drop-shadow-lg p-4 w-full flex gap-5 items-center">
					<Icon icon={"mdi:shop"} className="text-primary text-2xl" />
					<p className="font-semibold text-custom-light-gray">
						Shops
					</p>
				</Link>

				<Link href={`/vendor/settings`} className="bg-white rounded-lg drop-shadow-lg p-4 w-full flex gap-5 items-center">
					<Icon icon={"mdi:cog"} className="text-primary text-2xl" />
					<p className="font-semibold text-custom-light-gray">
						Settings
					</p>
				</Link>
			</SheetContent>
		</Sheet >
	)
}

export default Navbar
