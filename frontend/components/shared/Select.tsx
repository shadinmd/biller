"use client"
import { useState } from "react"
import { ShadSelect, SelectTrigger, SelectContent, SelectGroup, SelectItem } from "../shadcn/ShadSelect"

interface Props {
	items: string[],
	onSelect: (item: string) => void
}

const Select = ({ items, onSelect }: Props) => {
	const [selected, setSelected] = useState("Sort by")

	return (
		<ShadSelect onValueChange={(e) => onSelect(e)}>
			<SelectTrigger className="outline-none">
				<p>
					{selected}
				</p>
			</SelectTrigger>
			<SelectContent className="outline-none">
				<SelectGroup className="outline-none">
					{
						items.map((e, i) => (
							<SelectItem value={e} key={i} className="outline-none">
								{e}
							</SelectItem>
						))
					}
				</SelectGroup>
			</SelectContent>
		</ShadSelect>
	)
}

export default Select
