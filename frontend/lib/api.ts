import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({ baseURL: "http://localhost:8000/api" })

api.interceptors.request.use((request) => {
	if (localStorage.getItem("vendor-token")) {
		request.headers.Authorization = localStorage.getItem("vendor-token")
	}
	return request
})

export const handlAxiosError = (error: any) => {
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
