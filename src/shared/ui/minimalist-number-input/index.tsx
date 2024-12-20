'use client'
import React, { useState } from 'react'
import { ArrowIcon } from '../icon/arrow-icon'

interface MinimalistNumberInputProps {
	message?: string
	className?: string
	inputValue: number | ''
	setInputValue: React.Dispatch<React.SetStateAction<number | ''>>
	errorMessage?: string
}

export const MinimalistNumberInput = ({
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
	errorMessage = '',
	inputValue,
	setInputValue,
}: MinimalistNumberInputProps) => {
	const [focus, setFocus] = useState(false)

	return (
		<article className={className}>
			<section className='relative bg-inherit text-lg'>
				<article
					className={`bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full dark:after:bg-darkThemeTextGray after:bg-textGray  ${
						focus &&
						'dark:text-white dark:after:bg-white text-lightThemeTextDarkGray after:bg-lightThemeTextDarkGray '
					}`}
				>
					<input
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
						type='text'
						value={inputValue}
						onChange={e => {
							if (+e.target.value === 0) {
								setInputValue('')
								return
							}
							if (Number.isFinite(Number(e.target.value))) {
								setInputValue(+e.target.value)
							}
							Number.isFinite(Number(e.target.value))
								? setInputValue(+e.target.value)
								: ''
						}}
						className='bg-inherit font-normal focus:font-medium placeholder:text-textGray dark:text-white text-inherit outline-none w-full py-0.5'
					/>
					<section className='flex flex-col'>
						<section
							onClick={() => {
								setInputValue(+inputValue + 1)
							}}
						>
							<ArrowIcon
								styles={`transform rotate-180 w-3 h-3 hover:bg-darkGray ${
									focus
										? 'dark:fill-white dark:fill-lightThemeTextGray'
										: 'fill-textGray dark:fill-lightThemeTextDarkGray'
								}`}
							/>
						</section>
						<section
							onClick={() => {
								if (+inputValue === 1) {
									setInputValue('')
									return
								}
								if (+inputValue > 0) {
									setInputValue(+inputValue - 1)
								}
							}}
						>
							<ArrowIcon
								styles={`w-3 h-3 hover:bg-darkGray ${
									focus
										? 'dark:fill-white dark:fill-lightThemeTextGray'
										: 'fill-textGray dark:fill-lightThemeTextDarkGray'
								}`}
							/>
						</section>
					</section>
				</article>
				<span
					className={`
						flex absolute z-20 bottom-0 left-4 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none
						${
							!inputValue
								? '-translate-y-1.5 -translate-x-1.5 text-sm sm:text-xl px-0.5 py-1'
								: 'translate-y-3 translate-x-1 sm:translate-x-9 px-2 text-sm sm:text-xl py-0'
						}
						${
							focus
								? 'dark:text-white text-lightThemeTextDarkGray font-medium'
								: 'text-textGray font-normal'
						}
						${errorMessage && 'text-validationRed'}
					`}
				>
					{errorMessage ? errorMessage : message}
				</span>
			</section>
			{errorMessage && (
				<span
					className={`
					inline-block pt-4 text-base md:text-lg bg-opacity-100 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none origin-top-left text-validationRed
					${
						focus
							? 'dark:text-white text-lightThemeTextDarkGray font-medium'
							: 'dark:text-darkThemeTextGray text-textGray font-normal'
					}
					
				`}
				>
					{errorMessage}
				</span>
			)}
		</article>
	)
}
