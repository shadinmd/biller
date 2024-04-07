"use client"
import { ReactNode } from "react"
import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import Sidebar from "@/components/shared/Sidebar"
import { VendorProvider } from "@/context/vendorContext"
import Navbar from "@/components/vendor/Navbar"

const links: { title: string, to: string, icon: string }[] = [
	{ title: "Dashboard", to: "/vendor", icon: "mdi:home" },
	{ title: "Staffs", to: "/vendor/staffs", icon: "mdi:people-group" },
	{ title: "Customers", to: "/vendor/customers", icon: "mdi:people-group" },
	{ title: "Products", to: "/vendor/products", icon: "bi:boxes" },
	{ title: "Bills", to: "/vendor/bills", icon: "mdi:books" },
	{ title: "Settings", to: "/vendor/settings", icon: "mdi:gear" },
]

const Layout = ({ children }: { children: ReactNode }) => {

	const pathname = usePathname()

	useEffect(() => {
		if (!localStorage.getItem("vendor-token")) {
			redirect("/login")
		}
	}, [])

	return (
		<div className="flex flex-col lg:flex-row items-center justify-center h-screen w-screen">
			<VendorProvider>
				{
					pathname !== "/vendor/newshop" &&
					<Sidebar items={links} />
				}
				{
					pathname !== "/vendor/newshop" &&
					<Navbar items={links} />
				}
				<div className="flex flex-col gap-5 h-full w-full bg-custom-offwhite p-5">
					{children}
				</div>

			</VendorProvider>
		</div>
	)
}

export default Layout
