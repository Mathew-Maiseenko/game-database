'use client'
import React, { useState } from 'react'
import { MagnifierIcon } from '../magnifier-icon'
import { ArrowIcon } from '../arrow-icon'
// import { BiChevronDown } from 'react-icons/bi'
// import { AiOutlineSearch } from 'react-icons/ai'

interface MinimalistMultiSelectProps {
	options: string[] | undefined
	message?: string
	withSearch?: boolean
	searchMessage?: string
	className?: string
}

export const MinimalistMultiSelect = ({
	options,
	message = 'Select option',
	withSearch = true,
	searchMessage = 'Enter option name',
	className = 'w-72 font-medium h-80 ',
}: MinimalistMultiSelectProps) => {
	const [inputValue, setInputValue] = useState('')
	const [selected, setSelected] = useState<string[]>([])
	const [open, setOpen] = useState(false)

	return (
		<section className={className}>
			<article
				onClick={() => setOpen(!open)}
				className={`bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-full after:bg-textGray after:content-['']  ${
					selected.length && 'text-white after:bg-white'
				}`}
			>
				{selected.length
					? selected?.some((element: string) => element.length > 25)
						? selected?.some(
								(element: string) => element.substring(0, 25) + '...'
						  ) //возможна ошибка в типе
						: selected.join(', ')
					: message}
				<ArrowIcon
					styles={`transform transition-transform duration-300 rotate-0 ${
						open ? 'rotate-180' : ''
					}`}
					fill={selected.length ? 'white' : '#666666'}
				/>
				{/* <svg
					width='14'
					height='9'
					viewBox='0 0 14 9'
					fill={selected.length ? 'white' : '#666666'}
					xmlns='http://www.w3.org/2000/svg'
					// className={`rotate-0 ${open ? 'rotate-180' : ''}`}
					className={`transform transition-transform duration-300 rotate-0 ${
						open ? 'rotate-180' : ''
					}`}
				>
					<path d='M13.6673 1.83333L7.00065 8.5L0.333984 1.83333L1.51732 0.649999L7.00065 6.13333L12.484 0.649999L13.6673 1.83333Z' />
				</svg> */}
			</article>
			<ul
				className={`bg-darkGray mt-2 overflow-y-auto rounded-md  ${
					open ? 'max-h-60' : 'max-h-0'
				} `}
			>
				{withSearch && (
					<section className='flex justify-between items-center px-2 py-1 sticky top-0 bg-darkGray'>
						<MagnifierIcon styles='bg-inherit min-h-full absolute right-4 top-0 w-4 h-4' />
						<input
							type='text'
							value={inputValue}
							onChange={e => setInputValue(e.target.value.toLowerCase())}
							placeholder={searchMessage}
							className='placeholder:text-textGray text-white p-2 outline-none bg-darkGray'
						/>
					</section>
				)}
				{options &&
					options.map((option: string) => (
						<li
							key={option}
							className={`p-2 text-white text-sm hover:bg-orange hover:text-black
            ${selected?.includes(option) && 'bg-orange text-black'}
            ${
							option?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'
						}`}
							onClick={() => {
								if (selected?.includes(option)) {
									setSelected(selected.filter(item => item !== option))
									setOpen(false)
									setInputValue('')
								} else {
									setSelected([...selected, option])
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
