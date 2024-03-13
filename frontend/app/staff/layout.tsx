"use client"
import { ReactNode } from "react"
import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import Sidebar from "@/components/shared/Sidebar"
import api from "@/lib/api"

const links: { title: string, to: string, icon: string }[] = [
	{ title: "Dashboard", to: "/staff", icon: "mdi:home" },
	{ title: "Staffs", to: "/staff/staffs", icon: "mdi:people-group" },
	{ title: "Products", to: "/staff/products", icon: "mdi:books" },
	{ title: "Settings", to: "/staff/settings", icon: "mdi:gear" }
]

const Layout = ({ children }: { children: ReactNode }) => {

	const path = usePathname()

	useEffect(() => {
		if (path != "/staff/login") {
			if (localStorage.getItem("staff-token")) {
				api.interceptors.request.use(request => {
					request.headers.Authorization = localStorage.getItem("staff-token")
					return request
				})
			} else {
				redirect("/staff/login")
			}
		}
	}, [path])

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			{path != "/staff/login" && <Sidebar items={links} />}
			<div className="flex flex-col gap-5 h-full w-full bg-custom-offwhite p-5">
				{path != "/staff/login" && <p className="text-custom-light-gray">{path}</p>}
				{children}
			</div>
		</div>
	)
}

export default Layout
