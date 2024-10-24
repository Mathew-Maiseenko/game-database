'use client'
import React, { useState } from 'react'
import { MagnifierIcon } from '../icon/magnifier-icon'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface MinimalistInputProps {
	inputValue: string
	setInputValue:
		| ActionCreatorWithPayload<string, string>
		| React.Dispatch<React.SetStateAction<string>>
		| ((value: string) => void)
	message?: string
	searchMessage?: string
	className?: string
	withMagnifierIcon?: boolean
	errorMessage?: string
}

export const MinimalistInput = ({
	inputValue,
	setInputValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
	withMagnifierIcon = true,
	errorMessage = '',
}: MinimalistInputProps) => {
	const [focus, setFocus] = useState(false)

	return (
		<section className={`relative bg-inherit ${className}`}>
			<article
				className={`
					transition-all duration-200 bg-inherit dark:text-gray-light text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray  
					${
						focus &&
						'dark:text-white dark:after:bg-white text-lightThemeTextDarkGray after:bg-lightThemeTextDarkGray'
					}
					${errorMessage && 'text-validationRed after:bg-validationRed '}
				`}
			>
				<input
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					type='text'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					className='bg-inherit font-normal focus:font-medium placeholder:text-textGray black:text-white text-inherit outline-none pointer-events-auto w-full py-1'
				/>
				{withMagnifierIcon && (
					<MagnifierIcon
						styles={`w-5 h-5 ${
							focus
								? 'dark:fill-white fill-lightThemeTextGray'
								: 'fill-textGray'
						}`}
					/>
				)}
			</article>
			<span
				className={`
						flex absolute z-20 bottom-0 left-4 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none
						${
							!inputValue
								? '-translate-y-1.5 -translate-x-1.5 text-base sm:text-xl px-0.5 py-1'
								: 'translate-y-3 translate-x-7 sm:translate-x-9 text-sm sm:text-xl px-2 py-0'
						}
						${
							focus
								? 'dark:text-white text-lightThemeTextDarkGray font-medium'
								: 'dark:text-darkThemeTextGray text-textGray font-normal'
						}
						${errorMessage && 'text-validationRed'}
					`}
			>
				{errorMessage && !focus ? errorMessage : message}
			</span>
		</section>
	)
}
