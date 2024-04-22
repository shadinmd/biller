import { FC } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../shadcn/Dialog"
import { useRouter } from "next/navigation"

interface Props {
	open: boolean,
}

const ExpiredComponent: FC<Props> = ({ open }) => {

	const router = useRouter()

	const logout = () => {
		localStorage.removeItem("staff-token")
		router.push("/staff/login")
	}

	return (
		<Dialog open={open}>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle className="text-red-500">
						You don't have an active plan
					</DialogTitle>
					<DialogDescription>
						you don't have an active plan please purchase a plan to continue using our service
					</DialogDescription>
				</DialogHeader>
				<button onClick={e => { e.preventDefault(); logout() }} className="bg-red-500 text-white font-bold rounded-lg px-6 py-2">
					Logout
				</button>
			</DialogContent>
		</Dialog>
	)
}

export default ExpiredComponent

