interface MagnifierIconProps {
	styles?: string
	fill?: string
}
export function MagnifierIcon({
	styles = 'bg-inherit min-h-full absolute right-4 top-0',
	fill = 'none',
}: MagnifierIconProps) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 23.999 24.0011'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			className={styles}
		>
			<path
				id='Union'
				d='M12.353 0C5.92139 0 0.707031 5.2146 0.707031 11.6472C0.707031 14.5033 1.73486 17.1193 3.44141 19.1454L0 22.5869L1.41406 24.0011L4.85547 20.5597C6.88135 22.2661 9.49707 23.2943 12.353 23.2943C18.7852 23.2943 23.999 18.0797 23.999 11.6472C23.999 5.2146 18.7852 0 12.353 0ZM12.353 2C7.02588 2 2.70703 6.31915 2.70703 11.6472C2.70703 16.9752 7.02588 21.2943 12.353 21.2943C17.6807 21.2943 21.999 16.9752 21.999 11.6472C21.999 6.31915 17.6807 2 12.353 2Z'
				clip-rule='evenodd'
				fill={fill}
				fill-opacity='1'
				fill-rule='evenodd'
			/>
		</svg>
	)
}
