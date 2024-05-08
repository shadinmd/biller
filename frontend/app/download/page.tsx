"use client"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React from 'react'

const Download = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen'>
			<Navbar />
			<div className='flex gap-20 items-center justify-center h-full w-full'>
				<div className='flex flex-col gap-5'>
					<Icon icon={"devicon:windows8"} className='size-28' />
					<div className='flex flex-col'>
						<p
							className='text-primary font-bold'
						>
							Coming Soon
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-5 items-center'>
					<Icon icon={"devicon:linux"} className='size-28' />
					<div className='flex flex-col items-center gap-2'>
						<Link
							href={"https://github.com/shadinmhd/biller-desktop/releases/download/app-v0.1.0/biller_0.1.0_amd64.deb"}
							className='text-primary font-bold hover:underline'
						>
							.deb (ubuntu/debian)
						</Link>
						<Link
							href={"https://github.com/shadinmhd/biller-desktop/releases/download/app-v0.1.0/biller_0.1.0_amd64.AppImage"}
							className='text-primary font-bold hover:underline'
						>
							Appimage
						</Link>
					</div>
				</div>

				<div className='flex flex-col gap-5'>
					<Icon icon={"devicon:apple"} className='size-28' />
					<div className='flex flex-col'>
						<Link
							href={"https://github.com/shadinmhd/biller-desktop/releases/download/app-v0.1.0/biller_0.1.0_x64.dmg"}
							className='text-primary font-bold hover:underline'
						>
							Apple Silicon
						</Link>
					</div>
				</div>

			</div>
			<Footer />
		</div>
	)
}

export default Download
