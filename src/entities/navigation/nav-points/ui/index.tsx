import classes from './styles.module.css'
import Link from 'next/link'

// const teko = Teko({ subsets: ['latin'] })

interface NavPointProps {
	href: string
	title: string
}

export function NavPoint({ href, title }: NavPointProps) {
	return (
		<Link href={href} className={`${classes.link} cursor-pointer`}>
			<span className={`${classes.text}`}>{title}</span>
		</Link>
	)
}
