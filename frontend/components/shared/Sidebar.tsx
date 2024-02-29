import SidebarItem from "./SidebarItem"

interface Props {
	items: { title: string, to: string, icon: string }[]
}

const Sidebar = ({ items }: Props) => {
	return (
		<div className="flex flex-col gap-10 w-30 items-center justify-start h-full bg-custom-offwhite p-5">
			<p className="-tracking-widest text-primary font-extrabold text-4xl w-full">Biller</p>
			<div className="flex flex-col gap-2 items-center">
				{
					items.map((e, i) => (
						<SidebarItem key={i} title={e.title} to={e.to} icon={e.icon} />
					))
				}
			</div>
		</div>
	)
}

export default Sidebar
