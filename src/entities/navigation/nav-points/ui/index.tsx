import classes from './styles.module.css'
import Link from 'next/link'

// const teko = Teko({ subsets: ['latin'] })

interface NavPointProps {
	onClickFunction?: () => void
	href: string
	title: string
}

export function NavPoint({ href, title, onClickFunction }: NavPointProps) {
	return (
		<Link
			onClick={onClickFunction}
			href={href}
			className={`${classes.link} cursor-pointer`}
		>
			<span className={`${classes.text}`}>{title}</span>
		</Link>
	)
}
