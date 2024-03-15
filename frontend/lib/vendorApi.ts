import axios, { isAxiosError } from "axios"

export const vendorApi = axios.create({
	baseURL: "http://localhost:8000/api"
})

vendorApi.interceptors.request.use(request => {
	if (localStorage.getItem("vendor-token")) {
		request.headers.Authorization = localStorage.getItem("vendor-token")
	}
	return request
})

vendorApi.interceptors.response.use(
	(res) => res,
	(error) => {
		if (isAxiosError(error)) {

			if (error?.response?.data?.error == "blocked") {
				localStorage.removeItem("vendor-token")
				window.location.assign("/login")

			} else if (error.response?.data.error == "invalidtoken") {
				localStorage.removeItem("vendor-token")
				window.location.assign("/login")

			} else if (error.response?.data.error == "unauthorized") {
				localStorage.removeItem(`vendor-token`)
				location.assign("/login")

			} else if (error.response?.data.error == "notfound") {
				localStorage.removeItem("vendor-token")
				location.assign("/login")
			}

			return Promise.reject(error)

		} else {
			console.log(error)
			return Promise.reject(error)
		}
	}
)
