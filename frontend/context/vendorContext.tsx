"use client"
import ExpiredComponent from "@/components/vendor/ExpiredComponent";
import { vendorApi } from "@/lib/vendorApi";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import VendorInterface, { FullVendorInterface } from "types/vendor.interface";

interface Props {
	fetchVendorDetails: () => void,
	vendor: FullVendorInterface
}

const vendorContext = createContext<Props>({
	vendor: {
		_id: "",
		username: "",
		password: "",
		email: "",
		shop: "",
		verified: true,
		verificationToken: "",
		verificationExpiry: new Date(),
		activePlan: {
			_id: "",
			name: "",
			description: "",
			price: 0,
			discount: 0,
			active: false,
			features: [],
			productLimit: 0,
			billLimit: 0,
		},
		planExpiry: new Date(),
		subscribed: true,
		active: false,
		blocked: false,
		deleted: false,
	},
	fetchVendorDetails: () => { }
})

export const VendorProvider = ({ children }: { children: ReactNode }) => {

	const pathname = usePathname()
	const [expiredModal, setExpiredModal] = useState(false)
	const [vendor, setVendor] = useState<FullVendorInterface>({
		_id: "",
		username: "",
		password: "",
		email: "",
		shop: "",
		verified: true,
		verificationToken: "",
		verificationExpiry: new Date(),
		activePlan: {
			_id: "",
			name: "",
			description: "",
			price: 0,
			discount: 0,
			active: false,
			features: [],
			productLimit: 0,
			billLimit: 0,
		},
		planExpiry: new Date(),
		active: false,
		subscribed: true,
		blocked: false,
		deleted: false,
	})

	const fetchVendorDetails = () => {
		if (localStorage.getItem("vendor-token")) {
			vendorApi.get("/vendor")
				.then(({ data }) => {
					if (data.success) {
						console.log(data.vendor)
						setVendor(data.vendor)
					} else {
						toast.error(data.message)
					}
				})
		}
	}

	useEffect(() => {
		if (localStorage.getItem("vendor-token")) {
			vendorApi.get("/vendor")
				.then(({ data }) => {
					if (data.success) {
						console.log(data.vendor)
						setVendor(data.vendor)
					} else {
						toast.error(data.message)
					}
				})
		}
	}, [])

	useEffect(() => {
		if (pathname != "/vendor/subscribe" && !vendor.subscribed) {
			setExpiredModal(true)
		} else {
			setExpiredModal(false)
		}
	}, [vendor, pathname])

	return (
		<vendorContext.Provider value={{ vendor, fetchVendorDetails }}>
			<ExpiredComponent open={expiredModal} />
			{children}
		</vendorContext.Provider>
	)
}

export const useVendor = () => {
	return useContext(vendorContext)
}
