import { Teko } from 'next/font/google'
import Link from 'next/link'

const teko = Teko({ subsets: ['latin'] })

export function MainLogo() {
	return (
		<Link
			href={'/'}
			className={`${teko.className} text-center text-yellow text-7xl font-medium self-center md:order-1 cursor-pointer`}
		>
			Cyber List
		</Link>
	)
}
