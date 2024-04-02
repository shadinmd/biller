import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/Dialog"

interface Props {
	children: ReactNode
}

const EditBill = ({ children }: Props) => {

	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>

					</DialogTitle>
					<DialogDescription>

					</DialogDescription>
				</DialogHeader>
				<div>

				</div>
			</DialogContent>
		</Dialog>
	)
}

export default EditBill
