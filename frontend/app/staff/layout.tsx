"use client"
import { ReactNode } from "react"
import { useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import api from "@/lib/api"
import StaffSidebar from "@/components/staff/StaffSidebar"
import { StaffProvider } from "@/context/staffContext"

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
			<StaffProvider>
				{path != "/staff/login" && <StaffSidebar />}
				<div className="flex flex-col gap-5 h-full w-full bg-custom-offwhite p-5">
					{children}
				</div>
			</StaffProvider>
		</div>
	)
}

export default Layout
