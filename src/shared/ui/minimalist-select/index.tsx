'use client'
import React, { useState } from 'react'
import { MagnifierIcon } from '../icon/magnifier-icon'
import { ArrowIcon } from '../icon/arrow-icon'

interface MinimalistSelectProps {
	options: string[]
	message?: string
	withSearch?: boolean
	searchMessage?: string
	className?: string
	selectedOption: string
	setSelected: React.Dispatch<React.SetStateAction<string>>
}

export const MinimalistSelect = ({
	options,
	message = 'Select option',
	withSearch = true,
	searchMessage = 'Enter option name',
	className = 'w-72 font-medium h-80 ',
	selectedOption,
	setSelected,
}: MinimalistSelectProps) => {
	const [inputValue, setInputValue] = useState('')
	const [open, setOpen] = useState(false)

	return (
		<section className={className}>
			<article
				onClick={() => setOpen(!open)}
				className={`bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray after:content-['']  ${
					selectedOption &&
					'dark:text-white dark:after:bg-white text-lightThemeTextDarkGray after:bg-lightThemeTextDarkGray'
				}`}
			>
				{selectedOption
					? selectedOption?.length > 25
						? selectedOption?.substring(0, 25) + '...'
						: selectedOption
					: message}
				<ArrowIcon
					styles={`transform transition-transform duration-300 rotate-0 fill-textGray ${
						open && 'rotate-180 dark:fill-white fill-black'
					}`}
				/>
			</article>
			<ul
				className={`dark:text-white bg-white dark:bg-darkGray mt-2 overflow-y-auto rounded-md  ${
					open
						? 'max-h-60 dark:border-none border-2 border-lightThemeBorderGray'
						: 'max-h-0'
				} `}
			>
				{withSearch && (
					<section className='flex justify-between items-center px-2 py-1 sticky top-0 dark:border-none border-b-2 border-lightThemeBorderGray bg-white dark:bg-darkGray'>
						<MagnifierIcon
							styles={`bg-inherit min-h-full absolute right-4 top-0 w-4 h-4 fill-textGray ${
								open && 'dark:fill-white fill-black'
							}`}
						/>
						<input
							type='text'
							value={inputValue}
							onChange={e => setInputValue(e.target.value.toLowerCase())}
							placeholder={searchMessage}
							className='placeholder:text-textGray text-black dark:text-white p-2 outline-none bg-inherit'
						/>
					</section>
				)}
				{options.map(option => (
					<li
						key={option}
						className={`p-2 bg-white dark:bg-darkGray text-black dark:text-white text-sm hover:bg-hoverBlue dark:hover:bg-orange hover:text-black
            ${
							option?.toLowerCase() === selectedOption?.toLowerCase() &&
							'bg-activeBlue dark:bg-orange text-black'
						}
            ${
							option?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'
						}`}
						onClick={() => {
							if (option?.toLowerCase() !== selectedOption.toLowerCase()) {
								setSelected(option)
								setOpen(false)
								setInputValue('')
							} else if (
								option?.toLowerCase() === selectedOption.toLowerCase()
							) {
								setSelected('')
								setOpen(false)
								setInputValue('')
							}
						}}
					>
						{option}
					</li>
				))}
			</ul>
		</section>
	)
}
