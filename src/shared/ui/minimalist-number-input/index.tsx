'use client'
import React, { useState } from 'react'
import { ArrowIcon } from '../arrow-icon'

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
	// const [inputValue, setInputValue] = useState<number | ''>('')
	const [focus, setFocus] = useState(false)

	return (
		<section className={`relative ${className}`}>
			<article
				className={`bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray  ${
					focus && 'text-white after:bg-white '
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
					className='bg-inherit placeholder:text-textGray text-white outline-none'
				/>
				<section className='flex flex-col'>
					<section
						onClick={() => {
							setInputValue(+inputValue + 1)
						}}
					>
						<ArrowIcon
							styles={`transform rotate-180 w-3 h-3 hover:bg-darkGray`}
							fill={focus ? 'white' : '#666666'}
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
							styles={`w-3 h-3 hover:bg-darkGray`}
							fill={focus ? 'white' : '#666666'}
						/>
					</section>
				</section>
			</article>
			<span
				className={`
						flex absolute z-20 bottom-0 left-4 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none 
						${
							!inputValue
								? '-translate-y-1.5 -translate-x-1.5 text-xl px-0.5'
								: 'translate-y-3 translate-x-9 px-2'
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
	Number.isFinite(Number(e.target.value))
	? setInputValue(+e.target.value)
	: ''
*/
