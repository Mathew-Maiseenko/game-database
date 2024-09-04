interface ArrowIconProps {
	styles?: string
	fill?: string
}

export const ArrowIcon = ({ styles, fill }: ArrowIconProps) => {
	return (
		<svg
			width='14'
			height='9'
			viewBox='0 0 14 9'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'
			className={styles}
		>
			<path d='M13.6673 1.83333L7.00065 8.5L0.333984 1.83333L1.51732 0.649999L7.00065 6.13333L12.484 0.649999L13.6673 1.83333Z' />
		</svg>
	)
}
