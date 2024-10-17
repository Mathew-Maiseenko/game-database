'use client'
import { MinimalistInput } from '@/shared/ui'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useCallback, useState } from 'react'
import { useDebounce } from '../../lib/use-debounce'

interface MinimalistInputProps {
	filtrationValue: string
	setFiltrationValue:
		| ActionCreatorWithPayload<string, string>
		| React.Dispatch<React.SetStateAction<string>>
	message?: string
	searchMessage?: string
	className?: string
}

export function InputWithDebounce({
	filtrationValue,
	setFiltrationValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80',
}: MinimalistInputProps) {
	const parseFiltrationValue = useDebounce(value => {
		setFiltrationValue(value)
	}, 1000)

	const [preDebouncedInputValue, setPreDebouncedInputValue] =
		useState<string>(filtrationValue)

	const handleInputValueChange = useCallback((inputValue: string) => {
		setPreDebouncedInputValue(inputValue)
		parseFiltrationValue(inputValue)
	}, [])

	return (
		<MinimalistInput
			inputValue={preDebouncedInputValue}
			setInputValue={handleInputValueChange}
			className={className}
			message={message}
		/>
	)
}
