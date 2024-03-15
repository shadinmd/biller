"use client"

import YesNoModal from "@/components/shared/YesNoModal"
import { handleAxiosError } from "@/lib/api"
import { vendorApi } from "@/lib/vendorApi"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ProductInterface from "types/product.interface"

interface Props {
	params: {
		productId: string
	}
}

const ProductView = ({ params }: Props) => {

	const [product, setProduct] = useState<ProductInterface>()

	useEffect(() => {
		vendorApi.get(`/product/${params.productId}`)
			.then(({ data }) => {
				if (data.success) {
					setProduct(data.product)
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				handleAxiosError(error)
			})
	}, [params])

	return (
		<div className="flex gap-5 flex-col w-full h-full">

			<div className="flex items-center gap-5 w-full h-56 ">

				<div className="flex items-center bg-white drop-shadow-lg rounded-lg w-full h-full">
					<div className="flex flex-col w-full h-full p-5">
						<p className="font-bold text-xl">{product?.name}</p>
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
						</p>
					</div>
				</div>

				<div className="grid gap-5 grid-cols-2 grid-rows-2 h-full w-full">
					<div className="bg-white drop-shadow-lg rounded-lg w-full h-full"></div>
					<div className="bg-white drop-shadow-lg rounded-lg w-full h-full"></div>
					<div className="bg-white drop-shadow-lg rounded-lg w-full h-full"></div>
					<div className="bg-white drop-shadow-lg rounded-lg w-full h-full"></div>
				</div>

			</div>

			<div className="flex items-center gap-5 h-full w-full">
				<div className="bg-white drop-shadow-lg rounded-lg w-full h-full"></div>
				<div className="bg-white drop-shadow-lg rounded-lg w-full h-full"></div>
			</div>

		</div>
	)
}

export default ProductView
