import { HoverIconWithText } from '../..'

export function HoverDownloadCalendarIcon() {
	return (
		<HoverIconWithText title='Last update'>
			<svg
				className='w-5 h-5'
				width='800px'
				height='800px'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					className='stroke-black dark:stroke-white'
					d='M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10H4M20 10V11.75M4 10V19C4 20.1046 4.89543 21 6 21H12M8 3V7M16 3V7'
					stroke-width='2'
					stroke-linecap='round'
				/>
				<path
					className='stroke-black dark:stroke-white'
					d='M18 15V21M18 21L15.5 18.5M18 21L20.5 18.5'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</svg>
		</HoverIconWithText>
	)
}
