import Link from "next/link"

const Footer = () => {
	return (
		<footer className="flex items-center justify-between justify-self-end bg-[#151515] text-white w-full">
			<div className="flex flex-col px-20 py-10 w-full text-custom-gray">
				<p className="-tracking-widest font-extrabold text-2xl text-white ">Biller</p>
				<p>
					Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
				</p>
				<div>
					<Link href="https://www.linkedin.com/in/shadin-muhammed-69b004256/">L</Link>
					<Link href="https://github.com/shadinmhd">G</Link>
				</div>
			</div>
			<div className="w-full">

			</div>
			<div className="flex flex-col gap-5 w-full text-custom-gray">
				<p className="text-white">Contact</p>
				<div className="flex flex-col">
					<p>+91 85889908075</p>
					<p>shadinmhd98@gmail.com</p>
					<p>673572</p>
				</div>
				<div className="flex gap-2">

				</div>
			</div>
		</footer>
	)
}

export default Footer
