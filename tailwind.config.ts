//import { Yellowtail } from 'next/font/google'
import type { Config } from 'tailwindcss'

const config: Config = {
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
			blue: '#1fb6ff',
			pink: '#ff49db',
			orange: '#ff7849',
			orangeBorder: 'rgb(251, 191, 36)',
			green: '#13ce66',
			'gray-dark': '#273444',
			gray: '#8492a6',
			'gray-light': '#d3dce6',
			black: '#06040F',
			white: 'white',
			yellow: '#FF9C00',
			whiteGray: '#27292a',
			textGray: '#666',
			inherit: 'inherit',
			userIcon: '#8492a6',
			darkGray: '#1f2122',
			grayLineAfterCard: '#353637',
		},
	},

	plugins: [],
}
export default config
