'use client'

import { Dispatch, SetStateAction } from 'react'
import classes from './styles.module.css'

interface BurgerIconProps {
	isIconActive: boolean
	setIconActive: Dispatch<SetStateAction<boolean>>
}

export function BurgerIcon({ isIconActive, setIconActive }: BurgerIconProps) {
	return (
		<svg
			className={`md:w-20 sm:w-11
          ${classes.burgerIcon} ${classes.burgerIconRotate} 
          ${classes.burgerIcon8} ${
				isIconActive ? classes.activeBurgerClass : ''
			} 
        `}
			viewBox='0 0 100 100'
			// width='80'
			onClick={() => setIconActive(!isIconActive)}
		>
			<path
				className={`
            ${classes.line} ${classes.top} 
          `}
				d='m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20'
			/>
			<path
				className={`
            ${classes.line} ${classes.middle}
            `}
				d='m 30,50 h 40'
			/>
			<path
				className={`
            ${classes.line} ${classes.bottom}
          `}
				d='m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20'
			/>
		</svg>
	)
}
