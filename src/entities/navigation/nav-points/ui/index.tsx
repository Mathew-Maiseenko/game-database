import Link from 'next/link'

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
			className={
				'flex justify-self-end self-end relative bottom-1.5 cursor-pointer'
			}
		>
			<span
				className={
					'dark:text-yellow text-blue relative font-medium text-xl sm:text-2xl md:text-4xl dark:after:bg-yellow after:bg-blue after:absolute after:left-0 after:h-0.5 after:w-0 after:hover:w-full after:-bottom-0.5 after:transition-all after:duration-200 after:ease-in'
				}
			>
				{title}
			</span>
		</Link>
	)
}
