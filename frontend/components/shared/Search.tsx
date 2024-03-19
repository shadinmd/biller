"use client"
import { useEffect, useState } from "react"
import ProductInterface from "types/product.interface"
import { ScrollArea } from "../shadcn/Scrollarean"

interface Props {
	products: ProductInterface[],
	selectProduct: (product: ProductInterface) => void
}

const Search = ({ products, selectProduct }: Props) => {

	const [input, setInput] = useState("")
	const [filtered, setFiltered] = useState<ProductInterface[]>([])

	useEffect(() => {
		if (input.length > 0) {
			setFiltered(products.filter((e) => e.name.includes(input) || e.barcode == input))
		} else {
			setFiltered(products)
		}
	}, [input, products])

	const handleSelect = (product: ProductInterface) => {
		selectProduct(product)
		setInput("")
	}

	return (
		<div className="flex relative flex-col items-start  w-full">
			<input
				autoFocus
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Search"
				type="text"
				className="border-2 z-0 border-custom-gray outline-none rounded-lg w-full px-3 py-1"
				onKeyDown={(e) => e.key == "Enter" && (filtered.length > 0 && handleSelect(filtered[0]))}
			/>
			{
				input.length > 0 &&
				<ScrollArea className="z-10 absolute inset-0 p-1 h-[400px] bg-white drop-shadow-lg rounded-lg">
					{filtered.length > 0 ?
						filtered.map((e, i) => (
							<div
								key={i}
								className="hover:text-primary cursor-pointer"
								onClick={(event) => { event.preventDefault(); handleSelect(e) }}
							>
								{e.name}
							</div>
						))
						:
						<p className="text-red-500 italic">not found</p>
					}
				</ScrollArea>
			}
		</div>
	)
}

export default Search
