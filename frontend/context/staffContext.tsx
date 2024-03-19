"use client"
import { handleAxiosError } from "@/lib/api";
import { staffApi } from "@/lib/staffApi";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import StaffInterface from "types/staff.interface";

interface Props {
	staff: StaffInterface
	fetchStaffDetails: () => void
}

const staffContext = createContext<Props>({
	staff: {
		_id: "",
		username: "",
		password: "",
		shop: "",
		blocked: false,
		manager: false
	},
	fetchStaffDetails: () => { }
})

export const StaffProvider = ({ children }: { children: ReactNode }) => {

	const [staff, setStaff] = useState<StaffInterface>(
		{
			_id: "",
			username: "",
			password: "",
			shop: "",
			blocked: false,
			manager: false
		}
	)

	const fetchStaffDetails = async () => {
		try {
			const { data } = await staffApi.get("/staff")
			if (data.success) {
				setStaff(data.staff)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	useEffect(() => {
		if (localStorage.getItem("staff-token")) {
			staffApi.get("/staff")
				.then(({ data }) => {
					if (data.success) {
						setStaff(data.staff)
					} else {
						toast.error(data.message)
					}
				})
				.catch(error => {
					handleAxiosError(error)
				})
		}
	}, [])

	return (
		<staffContext.Provider value={{ staff, fetchStaffDetails }}>
			{children}
		</staffContext.Provider>
	)
}

export const useStaff = () => {
	return useContext(staffContext)
}
