"use client"
import { ReactNode } from "react"
import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import Sidebar from "@/components/shared/Sidebar"

const links: { title: string, to: string, icon: string }[] = [
	{ title: "Dashboard", to: "/admin", icon: "mdi:home" },
	{ title: "Vendors", to: "/admin/vendors", icon: "mdi:people-group" },
	{ title: "Plans", to: "/admin/plans", icon: "mdi:books" },
	{ title: "Settings", to: "/admin/settings", icon: "mdi:gear" }
]

const Layout = ({ children }: { children: ReactNode }) => {
	const path = usePathname()

	useEffect(() => {
		if (path != "/admin/login")
			if (!localStorage.getItem("admin-token")) {
				redirect("/admin/login")
			}
	}, [])

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			{path != "/admin/login" && <Sidebar items={links} />}
			<div className="flex flex-col gap-5 h-full w-full bg-custom-offwhite p-5">
				<p className="text-custom-light-gray">{path}</p>
				{children}
			</div>
		</div>
	)
}

export default Layout
