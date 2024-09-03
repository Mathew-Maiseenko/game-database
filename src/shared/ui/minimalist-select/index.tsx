'use client'
import React, { useEffect, useState } from 'react'
import { MagnifierIcon } from '../magnifier-icon'
// import { BiChevronDown } from 'react-icons/bi'
// import { AiOutlineSearch } from 'react-icons/ai'

interface MinimalistSelectorProps {
	options: string[]
	message?: string
}

export const MinimalistSelect = ({
	options,
	message = 'Select option',
}: MinimalistSelectorProps) => {
	//const [options, setOptions] = useState([])
	const [inputValue, setInputValue] = useState('')
	const [selected, setSelected] = useState('')
	const [open, setOpen] = useState(false)

	// useEffect(() => {
	// 	fetch('https://restcountries.com/v2/all?fields=name')
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setCountries(data)
	// 		})
	// }, [])

	return (
		<div className='w-72 font-medium h-80 '>
			<div
				onClick={() => setOpen(!open)}
				// className={`bg-white w-full p-2 flex items-center justify-between rounded ${
				// 	!selected && 'text-textGray'
				// }`}

				className={`bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-full after:bg-textGray after:content-['']  ${
					selected && 'text-white after:bg-white'
				}`}
			>
				{selected
					? selected?.length > 25
						? selected?.substring(0, 25) + '...'
						: selected
					: message}
				<svg
					width='14'
					height='9'
					viewBox='0 0 14 9'
					fill={selected ? 'white' : '#666666'}
					xmlns='http://www.w3.org/2000/svg'
					// className={`rotate-0 ${open ? 'rotate-180' : ''}`}
					className={`transform transition-transform duration-300 rotate-0 ${
						open ? 'rotate-180' : ''
					}`}
				>
					<path
						d='M13.6673 1.83333L7.00065 8.5L0.333984 1.83333L1.51732 0.649999L7.00065 6.13333L12.484 0.649999L13.6673 1.83333Z'
						// fill='none'
					/>
				</svg>
			</div>
			<ul
				// style={{
				// 	border: '1px solid #000',
				// 	borderRadius: '9px',
				// }}
				className={`bg-darkGray mt-2 overflow-y-auto rounded-md  ${
					open ? 'max-h-60' : 'max-h-0'
				} `}
			>
				<div className='flex justify-between items-center px-2 py-1 sticky top-0 bg-darkGray'>
					{/* <AiOutlineSearch size={18} className='text-gray-700' /> */}
					{/* иконка 2 */}
					<MagnifierIcon styles='bg-inherit min-h-full absolute right-4 top-0 w-4 h-4' />
					<input
						type='text'
						value={inputValue}
						onChange={e => setInputValue(e.target.value.toLowerCase())}
						placeholder='Enter country name'
						className='placeholder:text-textGray text-white p-2 outline-none bg-darkGray'
					/>
				</div>
				{options.map(option => (
					<li
						key={option}
						className={`p-2 text-white text-sm hover:bg-orange hover:text-black
            ${
							option?.toLowerCase() === selected?.toLowerCase() &&
							'bg-orange text-black'
						}
            ${
							option?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'
						}`}
						onClick={() => {
							if (option?.toLowerCase() !== selected.toLowerCase()) {
								setSelected(option)
								setOpen(false)
								setInputValue('')
							}
						}}
					>
						{option}
					</li>
				))}
			</ul>
		</div>
	)
}
