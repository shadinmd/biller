import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({ baseURL: "http://localhost:8000/api" })

if (location.href.split("/")[3] == "vendor")
	api.interceptors.request.use((request) => {
		if (localStorage.getItem("vendor-token")) {
			request.headers.Authorization = localStorage.getItem("vendor-token")
		}
		return request
	})

if (location.href.split("/")[3] == "staff")
	api.interceptors.request.use((request) => {
		if (localStorage.getItem("staff-token")) {
			request.headers.Authorization = localStorage.getItem("staff-token")
		}
		return request
	})

if (location.href.split("/")[3] == "admin")
	api.interceptors.request.use((request) => {
		if (localStorage.getItem("admin-token")) {
			request.headers.Authorization = localStorage.getItem("admin-token")
		}
		return request
	})

api.interceptors.response.use(
	(res) => res,
	(error) => {
		if (isAxiosError(error)) {
			if (error?.response?.data?.error == "blocked") {
				localStorage.removeItem("token")
				toast.error("your account is blocked")
				window.location.assign("/login")

			} else if (error.response?.data.error == "invalidtoken") {
				localStorage.removeItem("token")
				window.location.assign("/login")

			} else if (error.response?.data.error == "unauthorized") {
				error.response.data.types.forEach((e: string) => {
					localStorage.removeItem(`${e}-token`)
				})
				location.href = "/"
			}
			return Promise.reject(error)
		} else {
			console.log(error)
			return Promise.reject(error)
		}
	}
)

export const handleAxiosError = (error: any) => {
	if (isAxiosError(error)) {
		if (error.response?.data.message)
			toast.error(error.response.data.message)
		else
			toast.error(error.message)
	}
	else
		toast.error("something went wrong")
	console.log(error)
}

export default api
