import axios, { isAxiosError } from "axios"
import { toast } from "sonner"

const BACKENDURL = process.env.NEXT_PUBLIC_BACKENDURL
export const adminApi = axios.create({
	baseURL: BACKENDURL,
})

adminApi.interceptors.request.use(request => {
	if (localStorage.getItem("admin-token"))
		request.headers.Authorization = localStorage.getItem("admin-token")
	return request
})

adminApi.interceptors.response.use(
	(res) => res,
	(error) => {
		if (isAxiosError(error)) {
			if (error?.response?.data?.error == "blocked") {
				localStorage.removeItem("admin-token")
				toast.error("your account is blocked")
				window.location.assign("/login")

			} else if (error.response?.data.error == "invalidtoken") {
				localStorage.removeItem("admin-token")
				window.location.assign("/login")

			} else if (error.response?.data.error == "unauthorized") {
				localStorage.removeItem(`admin-token`)
				location.href = "/"
			}
			return Promise.reject(error)
		} else {
			console.log(error)
			return Promise.reject(error)
		}
	}
)
