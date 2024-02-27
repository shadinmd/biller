import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

const About = () => {
	return (
		<div className="flex flex-col items-center w-screen h-screen">
			<Navbar />
			<div className="flex w-full h-full px-24">
				About
			</div>
			<Footer />
		</div>
	)
}

export default About