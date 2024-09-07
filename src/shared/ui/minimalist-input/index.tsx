'use client'
import React, { useState } from 'react'
import { MagnifierIcon } from '../magnifier-icon'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

interface MinimalistInputProps {
	inputValue: string
	setInputValue: ActionCreatorWithPayload<string, string>
	message?: string
	searchMessage?: string
	className?: string
}

export const MinimalistInput = ({
	inputValue,
	setInputValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
}: MinimalistInputProps) => {
	//const [inputValue, setInputValue] = useState('')
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
					onChange={e => setInputValue(e.target.value)} //.toLowerCase()???
					placeholder={message}
					className='bg-inherit placeholder:text-textGray text-white outline-none'
				/>
				<MagnifierIcon styles={`w-5 h-5`} fill={focus ? 'white' : '#666666'} />
			</article>
		</section>
	)
}
