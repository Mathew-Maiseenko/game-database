import classes from './style.module.css'

interface HoverIconWithTextProps {
	title: string
	children: JSX.Element
}
export function HoverIconWithText({ title, children }: HoverIconWithTextProps) {
	return (
		<article className={`${classes.icon} ${classes.message} group facebook`}>
			<section className={`${classes.tooltip} tooltip`}>{title}</section>
			<span className='p-1'>{children}</span>
		</article>
	)
}
