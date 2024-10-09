export const ErrorMessage = ({
	color = '#bf0017',
	classes,
}: {
	color?: string
	classes?: string
}) => (
	<>
		<svg
			className={classes}
			// width='800px'
			// height='800px'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z'
				stroke={color}
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M12 9V13'
				stroke={color}
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M12 17.0195V17'
				stroke={color}
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
		<h2 className='font-semibold text-5xl mt-3 text-errorMessageRed'>
			{'Oops... Something went wrong :('}
		</h2>
	</>
)
