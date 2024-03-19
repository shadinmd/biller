"use client"
import api from "@/lib/api";
import { vendorApi } from "@/lib/vendorApi";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import VendorInterface from "types/vendor.interface";

interface Props {
	fetchVendorDetails: () => void,
	vendor: {
		_id?: string,
		username: string
		password: string
		email: string
		activePlan: string
		planExpiry: Date
		active: boolean
		blocked: boolean
		deleted: boolean
	}
}

const vendorContext = createContext<Props>({
	vendor: {
		_id: "",
		username: "",
		password: "",
		email: "",
		activePlan: "",
		planExpiry: new Date(Date.now()),
		active: false,
		blocked: false,
		deleted: false
	},
	fetchVendorDetails: () => { }
})

export const VendorProvider = ({ children }: { children: ReactNode }) => {

	const [vendor, setVendor] = useState<VendorInterface>({
		_id: "",
		username: "",
		password: "",
		email: "",
		activePlan: "",
		planExpiry: new Date(Date.now()),
		active: false,
		blocked: false,
		deleted: false
	})

	const fetchVendorDetails = () => {

	}

	useEffect(() => {
		if (localStorage.getItem("vendor-token")) {
			vendorApi.get("/vendor")
				.then(({ data }) => {
					if (data.success) {
						setVendor(data.vendor)
					} else {
						toast.error(data.message)
					}
				})
		}
	}, [])

	return (
		<vendorContext.Provider value={{ vendor, fetchVendorDetails }}>
			{children}
		</vendorContext.Provider>
	)
}

export const useVendor = () => {
	return useContext(vendorContext)
}
