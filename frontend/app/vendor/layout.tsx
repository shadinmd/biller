"use client"
import { ReactNode } from "react"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import Sidebar from "@/components/shared/Sidebar"
import { VendorProvider } from "@/context/vendorContext"

const links: { title: string, to: string, icon: string }[] = [
	{ title: "Dashboard", to: "/vendor", icon: "mdi:home" },
	{ title: "Shops", to: "/vendor/shops", icon: "mdi:shop" },
	// { title: "Staffs", to: "/vendor/staff", icon: "mdi:people-group" },
	{ title: "Settings", to: "/vendor/settings", icon: "mdi:gear" }
]

const Layout = ({ children }: { children: ReactNode }) => {

	useEffect(() => {
		if (!localStorage.getItem("vendor-token")) {
			redirect("/login")
		}
	}, [])

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<VendorProvider>
				<Sidebar items={links} />
				<div className="flex flex-col gap-5 h-full w-full bg-custom-offwhite p-5">
					{children}
				</div>

			</VendorProvider>
		</div>
	)
}

export default Layout
