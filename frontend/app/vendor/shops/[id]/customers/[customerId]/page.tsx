interface Props {
	params: {
		id: string,
		customerId: string
	}
}

const page = ({ params }: Props) => {
	return (
		<div>
			{params.customerId}
		</div>
	)
}

export default page
