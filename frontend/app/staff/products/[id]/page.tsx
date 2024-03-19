"use client"
import { handleAxiosError } from "@/lib/api"
import { MouseEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import { Icon } from "@iconify/react"
import ProductInterface from "types/product.interface"
import { Separator } from "@/components/shadcn/Seperator"
import { staffApi } from "@/lib/staffApi"

interface Props {
	params: {
		id: string
	}
}

const ProductView = ({ params }: Props) => {

	const [product, setProduct] = useState<ProductInterface>({
		_id: "",
		name: "",
		image: "",
		brand: "",
		listed: false,
		shop: "",
		price: 0,
		stock: 0,
		sold: 0,
		barcode: "",
		profit: 0,
		createdAt: new Date()
	})
	const [newProduct, setNewProduct] = useState<ProductInterface>({
		_id: "",
		name: "",
		image: "",
		brand: "",
		listed: false,
		shop: "",
		price: 0,
		stock: 0,
		sold: 0,
		barcode: "",
		profit: 0,
		createdAt: new Date()
	})

	const [changed, setChanged] = useState(false)


	useEffect(() => {
		staffApi.get(`/product/${params.id}`)
			.then(({ data }) => {
				if (data.success) {
					setProduct(data.product)
					setNewProduct(data.product)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [params])

	useEffect(() => {
		if (JSON.stringify(newProduct) != JSON.stringify(product)) {
			setChanged(true)
		} else {
			setChanged(false)
		}
	}, [newProduct, product])

	const cancelChanges = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setNewProduct({ ...product })
		setChanged(false)
	}

	const updateProduct = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			const response = await staffApi.put(`/product/${params.id}`, { ...newProduct })
			if (response.data.success) {
				setProduct(prev => ({
					...prev,
					name: newProduct.name,
					price: newProduct.price,
					stock: newProduct.stock,
					profit: newProduct.profit
				}))
				toast.success(response.data.message)
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			handleAxiosError(error)
		}
	}

	return (
		<div className="flex gap-5 flex-col w-full h-full">

			<div className="flex items-center gap-5 w-full h-56 ">

				<div className="flex items-center bg-white drop-shadow-lg rounded-lg w-full h-full">
					<div className="flex flex-col w-full h-full p-5">
						<p className="font-bold text-xl">{product?.name}</p>
						<div>
							<Icon icon="mdi:image" />
						</div>
					</div>

					<div className="flex flex-col gap-2 items-end w-full h-full p-5">
						<div className={`${product?.listed ? "bg-green-500" : "bg-red-500"} text-sm text-white rounded-lg px-4 py-1`}>
							{
								product?.listed ?
									"Listed" :
									"unlisted"
							}
						</div>
						<p
							className="flex gap-1 items-center cursor-pointer text-sm text-custom-light-gray"
							onClick={async () => {
								navigator.clipboard.writeText(product?.barcode || "");
								toast.success("barcode copied")
							}}
						>
							<span>code: </span>
							{product?.barcode}
							<Icon icon={"solar:copy-bold"} />
						</p>
					</div>
				</div>

				<div className="grid gap-5 grid-cols-2 grid-rows-2 h-full w-full">

					<div className="flex items-center justify-between p-3 bg-white drop-shadow-lg rounded-lg w-full h-full">
						<div className="flex flex-col">
							<p className="text-custom-light-gray">sold</p>
							<p className="font-bold">{product?.sold}</p>
						</div>
						<div className="flex items-center justify-center text-white bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"material-symbols:contract"} className="text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-3 bg-white drop-shadow-lg rounded-lg w-full h-full">
						<div>
							<p className="text-custom-light-gray">profit this month</p>
							<p className="font-bold">$50,000</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"game-icons:money-stack"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-3 bg-white drop-shadow-lg rounded-lg w-full h-full">
						<div>
							<p className="text-custom-light-gray">Stock</p>
							<p className="font-bold">{product?.stock}</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"bi:boxes"} className="text-white text-2xl" />
						</div>
					</div>

					<div className="flex items-center justify-between p-3 bg-white drop-shadow-lg rounded-lg w-full h-full">
						<div>
							<p className="text-custom-light-gray">Rate</p>
							<p className="font-bold">5000</p>
						</div>
						<div className="flex items-center justify-center bg-primary rounded-xl w-[40px] h-[40px]">
							<Icon icon={"streamline:money-graph-analytics-business-product-graph-data-chart-analysis"} className="text-white text-2xl" />
						</div>
					</div>

				</div>

			</div>

			<div className="flex items-center gap-5 h-full w-full">

				<form className="flex flex-col justify-between bg-white font-bold p-3 drop-shadow-lg rounded-lg w-96 h-full">
					<div>
						<div className="flex items-center justify-between w-full">
							<p className="w-full">name</p>
							<input
								value={newProduct.name}
								onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
								className="w-14"
							/>
						</div>
						<Separator orientation="horizontal" className="w-full bg-custom-light-gray" />

						<div className="flex items-center justify-between w-full">
							<p className="w-full">price</p>
							<div className="flex gap-1 items-center">
								<button onClick={(e) => { e.preventDefault(); setNewProduct(prev => ({ ...prev, price: prev.price + 1 })) }}>
									<Icon icon={"mdi:plus"} className="text-xl" />
								</button>
								<input
									value={newProduct.price}
									onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
									type="number"
									className="w-10"
								/>
								<button onClick={(e) => { e.preventDefault(); newProduct.price && setNewProduct(prev => ({ ...prev, price: prev.price - 1 })) }}>
									<Icon icon={"mdi:minus"} className="text-xl" />
								</button>
							</div>
						</div>


						<div className="flex items-center justify-between w-full">
							<p className="w-full">profit</p>
							<div className="flex gap-1 items-center">
								<button onClick={(e) => { e.preventDefault(); setNewProduct(prev => ({ ...prev, profit: prev.profit + 1 })) }}>
									<Icon icon={"mdi:plus"} className="text-xl" />
								</button>
								<input
									value={newProduct.profit}
									onChange={e => setNewProduct(prev => ({ ...prev, profit: Number(e.target.value) }))}
									type="number"
									className="w-10"
								/>
								<button onClick={(e) => { e.preventDefault(); newProduct.profit > 0 && setNewProduct(prev => ({ ...prev, profit: prev.profit - 1 })) }}>
									<Icon icon={"mdi:minus"} className="text-xl" />
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between w-full">
							<p className="w-full">stock</p>
							<div className="flex gap-1 items-center">
								<button onClick={(e) => { e.preventDefault(); setNewProduct(prev => ({ ...prev, stock: prev.stock + 1 })) }}>
									<Icon icon={"mdi:plus"} className="text-xl" />
								</button>
								<input
									value={newProduct?.stock}
									onChange={(e) => setNewProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
									type="number"
									className="w-10"
								/>
								<button onClick={(e) => { e.preventDefault(); newProduct.stock > 0 && setNewProduct((prev) => ({ ...prev, stock: prev.stock - 1 })) }}>
									<Icon icon={"mdi:minus"} className="text-xl" />
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between w-full">
							<p>listed</p>
							<p>{product?.listed ? "yes" : "no"}</p>
						</div>

					</div>

					<div className="flex flex-col gap-3 items-start">
						<div className="flex gap-5 items-center w-full">
							{
								changed &&
								<>
									<button onClick={updateProduct} type="submit" className="text-white bg-primary w-full py-2 font-bold rounded-lg">
										Save
									</button>
									<button onClick={cancelChanges} type="submit" className="text-white bg-red-500 w-full py-2 font-bold rounded-lg">
										Cancel
									</button>
								</>
							}
						</div>
						<div className="flex gap-5 items-center justify-between w-full">
							<button type="submit" className="text-white bg-primary w-full py-2 font-bold rounded-lg">
								{product.listed ? "Unlist" : "List"}
							</button>

							<button type="submit" className="text-white bg-red-500 w-full py-2 font-bold rounded-lg">
								Delete
							</button>
						</div>

					</div>
				</form>

				<div className="flex items-center justify-center bg-white drop-shadow-lg rounded-lg w-full h-full">
					graph
				</div>

			</div>
		</div >
	)
}

export default ProductView

