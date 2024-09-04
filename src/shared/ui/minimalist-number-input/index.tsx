'use client'
import React, { useState } from 'react'
import { ArrowIcon } from '../arrow-icon'

interface MinimalistNumberInputProps {
	message?: string
	className?: string
}

export const MinimalistNumberInput = ({
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
}: MinimalistNumberInputProps) => {
	const [inputValue, setInputValue] = useState('')
	const [focus, setFocus] = useState(false)

	return (
		<section className={className}>
			<article
				className={`bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-full after:bg-textGray after:content-['']  ${
					focus && 'text-white after:bg-white '
				}`}
			>
				<input
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
					type='text'
					value={inputValue}
					onChange={e =>
						Number.isFinite(Number(e.target.value))
							? setInputValue(e.target.value)
							: ''
					}
					placeholder={message}
					className='bg-inherit placeholder:text-textGray text-white outline-none'
				/>
				<section className='flex flex-col'>
					<section onClick={() => setInputValue((+inputValue + 1).toString())}>
						<ArrowIcon
							styles={`transform rotate-180 w-3 h-3 hover:bg-darkGray`}
							fill={focus ? 'white' : '#666666'}
						/>
					</section>
					<section
						onClick={() => {
							if (+inputValue > 0) {
								setInputValue((+inputValue - 1).toString())
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
		</section>
	)
}
