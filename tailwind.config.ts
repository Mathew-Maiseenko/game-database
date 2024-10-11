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
			hoverBlue: '#37ceff',
			activeBlue: '#16adf1',
			blue: '#0ea5e9',
			pink: '#ff49db',
			orange: '#ff7849',
			orangeBorder: 'rgb(251, 191, 36)',
			green: '#13ce66',
			'gray-dark': '#273444',
			gray: '#8492a6',
			'gray-light': '#d3dce6',
			lightThemeBorderGray: '#888888',
			lightThemeGray: '#f2f2f2',
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
		},
	},

	plugins: [],
}
export default config
