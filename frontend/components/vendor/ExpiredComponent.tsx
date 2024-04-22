import { FC } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../shadcn/Dialog"
import Link from "next/link"

interface Props {
	open: boolean,
}

const ExpiredComponent: FC<Props> = ({ open }) => {
	return (
		<Dialog open={open}>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle className="text-red-500">
						You don&apos;t have an active plan
					</DialogTitle>
					<DialogDescription>
						you don&apos;t have an active plan please purchase a plan to continue using our service
					</DialogDescription>
				</DialogHeader>
				<Link href={"/plans"} className="bg-primary text-white font-bold rounded-lg px-6 py-2">
					View Plans
				</Link>
			</DialogContent>
		</Dialog>
	)
}

export default ExpiredComponent
