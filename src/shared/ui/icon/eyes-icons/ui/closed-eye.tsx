interface ClosedEyeIconProps {
	mainStyles?: string
	colorStyles?: string
}
export function ClosedEyeIcon({ mainStyles, colorStyles }: ClosedEyeIconProps) {
	return (
		<svg
			width='800px'
			height='800px'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={mainStyles}
		>
			<path
				d='M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5'
				className={colorStyles}
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	)
}