import Link from "next/link"
import { Icon } from "@iconify/react"
import { usePathname } from "next/navigation"

interface Props {
	title: string,
	to: string,
	icon: string
}

const SidebarItem = ({ title, to, icon }: Props) => {
	const path = usePathname()
	const active = path == to

	return (
		<Link href={to} className={`${active ? `bg-white rounded-lg drop-shadow-lg ` : ``} px-2 py-2 md:px-4 md:py-3 w-full flex gap-5 pr-6 md:pr-16 items-center`}>
			<div className={active ? `p-2 bg-primary rounded-lg` : `p-2 bg-white rounded-lg drop-shadow-lg`}>
				<Icon icon={icon} className={`${active ? `text-white` : `text-primary`} text-2xl`} />
			</div>
			<p className={active ? `font-bold` : `text-custom-light-gray`}>
				{title}
			</p>
		</Link>
	)
}

export default SidebarItem
