"use client"

import { useEffect, useState } from "react"
import StaffInterface from "types/staff.interface"

interface Props {
	params: {
		id: string,
		staffId: string
	}
}

const StaffView = ({ }: Props) => {

	const [staff, setStaff] = useState<StaffInterface>()

	useEffect(() => {

	}, [])

	return (
		<div>page</div>
	)
}

export default StaffView
