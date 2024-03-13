"use client"
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({ baseURL: "http://localhost:8000/api" })

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

export const staffApi = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		Authorization: localStorage.getItem("staff-token")
	}
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

export const adminApi = axios.create({
	baseURL: "http://localhost:8000/api",
	headers: {
		Authorization: localStorage.getItem("admin-token")
	}
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
