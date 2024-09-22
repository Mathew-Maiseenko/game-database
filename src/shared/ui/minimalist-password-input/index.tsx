'use client'
import React, { useState } from 'react'
import { MagnifierIcon } from '../magnifier-icon'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface MinimalistInputProps {
	inputValue: string
	setInputValue:
		| ActionCreatorWithPayload<string, string>
		| React.Dispatch<React.SetStateAction<string>>
	message?: string
	searchMessage?: string
	className?: string
	withMagnifierIcon?: boolean
	errorMessage?: string
}

export const MinimalistPasswordInput = ({
	inputValue,
	setInputValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
	withMagnifierIcon = true,
	errorMessage = '',
}: MinimalistInputProps) => {
	const [focus, setFocus] = useState(false)

	return (
		<section className={`relative ${className}`}>
			<article
				className={`
					transition-all duration-200 bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray 
					${focus && 'text-white after:bg-white '}
					${errorMessage && 'text-validationRed after:bg-validationRed '}
				`}
			>
				<input
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					type='password'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)} //.toLowerCase()??? inset-0
					//placeholder={message}
					className='bg-inherit placeholder:text-textGray text-white outline-none pointer-events-auto w-full'
				/>
				{withMagnifierIcon && (
					<MagnifierIcon
						styles={`w-5 h-5`}
						fill={focus ? 'white' : '#666666'}
					/>
				)}
			</article>
			<span
				className={`
						flex absolute z-10 bottom-0 left-4 bg-opacity-100 bg-inherit px-2 transition-all duration-200 ease-in-out translate-y-3 translate-x-9 select-none pointer-events-none
						${
							!inputValue &&
							'-translate-y-1.5 -translate-x-1.5 text-xl bg-opacity-0 px-0.5'
						}
						${focus ? 'text-white' : 'text-textGray'}
						${errorMessage && 'text-validationRed'}
					`}
			>
				{errorMessage ? errorMessage : message}
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
