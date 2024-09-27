'use client'
import classes from './classes.module.css'

export function AnimatedTickIcon() {
	return (
		<svg className='w-full' version='1.1' id='tick' viewBox='6 5 26 26'>
			<polyline
				className={classes['path']}
				points='
    11.6,20 15.9,24.2 26.4,13.8 '
			/>
		</svg>
	)
}
