//import { Yellowtail } from 'next/font/google'
import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'selector',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			animation: {
				'slide-in': 'slideIn 0.3s ease-in-out',
				'slide-out': 'slideOut 0.3s ease-in-out forwards',
			},
			keyframes: {
				slideIn: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideOut: {
					'0%': {
						transform: 'translateX(0)',
						display: 'block',
					},
					'100%': {
						transform: 'translateX(100%)',
						display: 'none',
					},
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			mainBgColor: '#f2f2f2',
			hoverBlue: '#37ceff',
			activeBlue: '#256de8',
			blue: '#0ea5e9',
			pink: '#ff49db',
			orange: '#ff7849',
			orangeHover: '#ff9e49',
			orangeActive: '#ff9061',
			orangeBorder: 'rgb(251, 191, 36)',
			green: '#13ce66',
			'gray-dark': '#273444',
			gray: '#8492a6',
			'gray-light': '#d3dce6',
			lightThemeBorderGray: '#b9b9b9', //#888888
			lightThemeGray: '#fafcfc',
			lightThemeTextGray: '#64748b',
			lightThemeTextDarkGray: '#273444',
			darkThemeTextGray: '#d3dce6',
			black: '#06040F',
			white: 'white',
			yellow: '#FF9C00',
			whiteGray: '#27292a',
			textGray: '#666',
			inherit: 'inherit',
			userIcon: '#8492a6',
			darkGray: '#1f2122',
			grayLineAfterCard: '#353637',
			validationRed: '#bf0017',
			errorMessageRed: '#bf0017',
			accountExitRed: '#bf0017',
			validationOrange: '#FF9933',
			validationGreen: '#28a745',
			activeButtonRed: '#b52110',
			paginationHover: '#cf562d',
			paginationActive: '#ffd349',
			gameDeleteRedLightTheme: '#e5263d',
			downloadGameButton: '#fdb698',
		},
	},

	plugins: [require('autoprefixer')],
}
export default config
