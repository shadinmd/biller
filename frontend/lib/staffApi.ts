import axios, { isAxiosError } from "axios"
import { toast } from "sonner"

const BACKENDURL = process.env.NEXT_PUBLIC_BACKENDURL
export const staffApi = axios.create({
	baseURL: BACKENDURL,
})

staffApi.interceptors.request.use(request => {
	if (localStorage.getItem("staff-token"))
		request.headers.Authorization = localStorage.getItem("staff-token")
	return request
})

staffApi.interceptors.response.use(
	(res) => res,
	(error) => {
		if (isAxiosError(error)) {
			if (error?.response?.data?.error == "blocked") {
				localStorage.removeItem("token")
				toast.error("your account is blocked")
				window.location.assign("/login")

			} else if (error.response?.data.error == "invalidtoken") {
				localStorage.removeItem("staff-token")
				window.location.assign("/login")

			} else if (error.response?.data.error == "unauthorized") {
				localStorage.removeItem(`staff-token`)
				location.href = "/"
			}
			return Promise.reject(error)
		} else {
			console.log(error)
			return Promise.reject(error)
		}
	}
)
