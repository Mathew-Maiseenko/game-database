import { HoverIconWithText } from '../..'

export function HoverSettingCalendarIcon() {
	return (
		<HoverIconWithText title='Release date'>
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
					d='M4 10V19C4 20.1046 4.89543 21 6 21H11M4 10V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V10H4ZM8 3V7M16 3V7'
					//stroke='#fff'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					className='stroke-black dark:stroke-white'
					d='M17.4641 15C18.2043 15 18.8506 15.4021 19.1964 15.9998M17.4641 15C16.7239 15 16.0776 15.4021 15.7318 15.9998M17.4641 15V13M17.4641 21V18.9667M20.9282 15L19.1964 15.9998M14 19L15.7318 18.0002M20.9282 19L19.1965 18.0002M14 15L15.7318 15.9998M15.7318 18.0002C15.5615 17.706 15.4641 17.3644 15.4641 17C15.4641 16.6356 15.5615 16.294 15.7318 15.9998M15.7318 18.0002C16.1255 18.6807 16.7977 18.9802 17.4641 18.9667M17.4641 18.9667C18.1521 18.9529 18.8338 18.6057 19.1965 18.0002M19.1965 18.0002C19.3645 17.7197 19.4641 17.3838 19.4641 17C19.4641 16.6356 19.3667 16.294 19.1964 15.9998'
					stroke-width='2'
					stroke-linecap='round'
				/>
			</svg>
		</HoverIconWithText>
	)
}
