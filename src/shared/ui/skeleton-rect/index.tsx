export const SkeletonRect = ({ styles }: { styles: string }) => {
	return (
		<svg
			role='img'
			className={styles}
			aria-labelledby='loading-aria'
			viewBox='0 0 1028 124'
			preserveAspectRatio='none'
		>
			<rect
				x='0'
				y='0'
				width='100%'
				height='100%'
				clip-path='url(#clip-path)'
				style={{ fill: 'url("#fill")' }}
			></rect>
			<defs>
				<clipPath id='clip-path'>
					<rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
				</clipPath>
				<linearGradient id='fill'>
					<stop offset='0.599964' stop-color='#666' stop-opacity='1'>
						<animate
							attributeName='offset'
							values='-2; -2; 1'
							keyTimes='0; 0.25; 1'
							dur='4s'
							repeatCount='indefinite'
						></animate>
					</stop>
					<stop offset='1.59996' stop-color='#b3b3b3' stop-opacity='1'>
						<animate
							attributeName='offset'
							values='-1; -1; 2'
							keyTimes='0; 0.25; 1'
							dur='4s'
							repeatCount='indefinite'
						></animate>
					</stop>
					<stop offset='2.59996' stop-color='#666' stop-opacity='1'>
						<animate
							attributeName='offset'
							values='0; 0; 3'
							keyTimes='0; 0.25; 1'
							dur='4s'
							repeatCount='indefinite'
						></animate>
					</stop>
				</linearGradient>
			</defs>
		</svg>
	)
}
