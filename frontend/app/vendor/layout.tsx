"use client"
import { ReactNode } from "react"
import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import Sidebar from "@/components/shared/Sidebar"

const links: { title: string, to: string, icon: string }[] = [
	{ title: "Dashboard", to: "/vendor", icon: "mdi:home" },
	{ title: "Shops", to: "/vendor/shops", icon: "mdi:shop" },
	// { title: "Staffs", to: "/vendor/staff", icon: "mdi:people-group" },
	{ title: "Settings", to: "/vendor/settings", icon: "mdi:gear" }
]

const Layout = ({ children }: { children: ReactNode }) => {
	const path = usePathname()

	useEffect(() => {
		if (!localStorage.getItem("vendor-token")) {
			redirect("/login")
		}
	}, [])

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<Sidebar items={links} />
			<div className="flex flex-col gap-5 h-full w-full bg-custom-offwhite p-5">
				<p className="text-custom-light-gray">{path}</p>
				{children}
			</div>
		</div>
	)
}

export default Layout
