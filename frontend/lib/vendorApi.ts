import axios, { isAxiosError } from "axios"
import { toast } from "sonner"

export const vendorApi = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		Authorization: localStorage.getItem("vendor-token")
	}
})

vendorApi.interceptors.response.use(
	(res) => res,
	(error) => {
		if (isAxiosError(error)) {
			if (error?.response?.data?.error == "blocked") {
				localStorage.removeItem("vendor-token")
				toast.error("your account is blocked")
				window.location.assign("/login")

			} else if (error.response?.data.error == "invalidtoken") {
				localStorage.removeItem("vendor-token")
				window.location.assign("/login")

			} else if (error.response?.data.error == "unauthorized") {
				localStorage.removeItem(`vendor-token`)
				location.href = "/login"
			}
			return Promise.reject(error)
		} else {
			console.log(error)
			return Promise.reject(error)
		}
	}
)
