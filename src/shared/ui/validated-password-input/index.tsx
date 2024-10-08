'use client'
import React, { useState } from 'react'
import { MagnifierIcon } from '../magnifier-icon'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { validatePassword } from './model'

interface MinimalistInputProps {
	inputValue: string
	setInputValue:
		| ActionCreatorWithPayload<string, string>
		| React.Dispatch<React.SetStateAction<string>>
	message?: string
	searchMessage?: string
	className?: string
	withMagnifierIcon?: boolean
}

export const ValidatedPasswordInput = ({
	inputValue,
	setInputValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
	withMagnifierIcon = true,
}: MinimalistInputProps) => {
	const [focus, setFocus] = useState(false)
	const [validationMessage, setValidationMessage] = useState('')
	const [reliabilityLevel, setReliabilityLevel] = useState<
		'red' | 'orange' | 'green' | ''
	>('')
	return (
		<section className={`relative ${className}`}>
			<article
				className={`transition-all duration-200 bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray  ${
					focus &&
					'dark:text-white dark:after:bg-white text-lightThemeTextDarkGray after:bg-lightThemeTextDarkGray '
				}
				${reliabilityLevel === 'red' && 'text-validationRed after:bg-validationRed '}
				${
					reliabilityLevel === 'green' &&
					'text-validationGreen after:bg-validationGreen '
				}
				${
					reliabilityLevel === 'orange' &&
					'text-validationOrange  after:bg-validationOrange '
				}

			`}
			>
				<input
					onFocus={() => setFocus(true)}
					onBlur={() => {
						setFocus(false)
						validatePassword(
							inputValue,
							setValidationMessage,
							setReliabilityLevel
						)
					}}
					type='password'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)} //.toLowerCase()??? inset-0
					//placeholder={message}
					className='bg-inherit placeholder:text-textGray text-white outline-none pointer-events-auto w-full'
				/>
				{withMagnifierIcon && (
					<MagnifierIcon
						styles={`w-5 h-5 ${
							focus
								? 'dark:fill-white dark:fill-lightThemeTextGray'
								: 'fill-textGray dark:fill-lightThemeTextDarkGray'
						}`}
					/>
				)}
			</article>
			<span
				className={`
						flex absolute z-10 bottom-0 left-4 bg-opacity-100 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none
						${
							!inputValue && !reliabilityLevel
								? '-translate-y-1.5 -translate-x-1.5 text-xl bg-opacity-0 px-0.5'
								: 'translate-y-3 translate-x-9 px-2'
						}
						${focus ? 'text-white' : 'text-textGray'}
						${reliabilityLevel === 'red' && 'text-validationRed after:bg-validationRed '}
						${
							reliabilityLevel === 'green' &&
							'text-validationGreen after:bg-validationGreen '
						}
						${
							reliabilityLevel === 'orange' &&
							'text-validationOrange  after:bg-validationOrange '
						}
					`}
			>
				{reliabilityLevel ? validationMessage : message}
			</span>
		</section>
	)
}

/*
		<section className={className}>
			<article
				className={`transition-all duration-200 bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-full after:bg-textGray after:content-['']  ${
					focus && 'text-white after:bg-white '
				}`}
			>
				<input
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					type='text'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)} //.toLowerCase()??? inset-0
					//placeholder={message}
					className='bg-inherit placeholder:text-textGray text-white outline-none pointer-events-auto'
				/>
				<span
					className={`
						flex absolute z-10 bottom-0 left-1 bg-opacity-100 bg-inherit px-2 transition-all duration-200 ease-in-out translate-y-3 translate-x-9 select-none pointer-events-none
						${!inputValue && '-translate-y-2 translate-x-1.5 bg-opacity-0 px-0'}
						${focus ? 'text-white' : 'text-textGray'}
					`}
				>
					{message}
				</span>
				{withMagnifierIcon && (
					<MagnifierIcon
						styles={`w-5 h-5`}
						fill={focus ? 'white' : '#666666'}
					/>
				)}
			</article>
		</section>
*/
