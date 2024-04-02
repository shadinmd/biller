"use client"
import { vendorApi } from "@/lib/vendorApi";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import VendorInterface from "types/vendor.interface";

interface Props {
	fetchVendorDetails: () => void,
	vendor: VendorInterface
}

const vendorContext = createContext<Props>({
	vendor: {
		_id: "",
		username: "",
		password: "",
		email: "",
		verified: true,
		verificationToken: "",
		activePlan: "",
		planExpiry: new Date(),
		active: false,
		blocked: false,
		deleted: false,
	},
	fetchVendorDetails: () => { }
})

export const VendorProvider = ({ children }: { children: ReactNode }) => {

	const router = useRouter()
	const [vendor, setVendor] = useState<VendorInterface>({
		_id: "",
		username: "",
		password: "",
		email: "",
		verified: true,
		verificationToken: "",
		activePlan: "",
		planExpiry: new Date(),
		active: false,
		blocked: false,
		deleted: false,
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
