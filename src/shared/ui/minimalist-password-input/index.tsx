'use client'
import React, { useState } from 'react'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { OpenEyeIcon } from '../icon/eyes-icons/ui/open-eye'
import { ClosedEyeIcon } from '../icon/eyes-icons/ui/closed-eye'

interface MinimalistInputProps {
	inputValue: string
	setInputValue:
		| ActionCreatorWithPayload<string, string>
		| React.Dispatch<React.SetStateAction<string>>
	message?: string
	searchMessage?: string
	className?: string
	errorMessage?: string
}

export const MinimalistPasswordInput = ({
	inputValue,
	setInputValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
	errorMessage = '',
}: MinimalistInputProps) => {
	const [focus, setFocus] = useState(false)
	const [isPasswordShow, setPasswordShown] = useState(false)
	return (
		<section className={`relative ${className}`}>
			<article
				className={`
					transition-all duration-200 bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray 
					${
						focus &&
						'dark:text-white dark:after:bg-white text-lightThemeTextDarkGray after:bg-lightThemeTextDarkGray '
					}
					${errorMessage && 'text-validationRed after:bg-validationRed '}
				`}
			>
				{isPasswordShow ? (
					<input
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						type='text'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className='bg-inherit font-normal focus:font-medium placeholder:text-textGray black:text-white text-inherit outline-none pointer-events-auto w-full py-1'
					/>
				) : (
					<input
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						type='password'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className='bg-inherit font-normal focus:font-medium placeholder:text-textGray black:text-white text-inherit outline-none pointer-events-auto w-full py-1'
					/>
				)}

				{inputValue && (
					<section
						onClick={() => setPasswordShown(!isPasswordShow)}
						className='w-5 h-full cursor-pointer flex justify-center items-center absolute right-4'
					>
						{isPasswordShow ? (
							<OpenEyeIcon
								mainStyles='w-full h-full'
								colorStyles={`${
									focus
										? 'dark:stroke-white stroke-lightThemeTextGray'
										: 'stroke-textGray dark:stroke-lightThemeTextDarkGray'
								}`}
							/>
						) : (
							<ClosedEyeIcon
								mainStyles='w-full h-full'
								colorStyles={`${
									focus
										? 'dark:stroke-white stroke-lightThemeTextGray'
										: 'stroke-textGray dark:stroke-lightThemeTextDarkGray'
								}`}
							/>
						)}
					</section>
				)}
			</article>
			<span
				className={`
						flex absolute z-10 bottom-0 left-4 bg-opacity-100 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none
						${
							!inputValue
								? '-translate-y-1.5 -translate-x-1.5 text-base sm:text-xl bg-opacity-0 px-0.5 py-1'
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
				{errorMessage ? errorMessage : message}
			</span>
		</section>
	)
}
