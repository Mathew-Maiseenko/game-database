'use client'
import React, { useCallback, useState } from 'react'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ClosedEyeIcon } from '../icon/eyes-icons/ui/closed-eye'
import { OpenEyeIcon } from '../icon/eyes-icons/ui/open-eye'

interface MinimalistInputProps {
	inputValue: string
	setInputValue:
		| ActionCreatorWithPayload<string, string>
		| React.Dispatch<React.SetStateAction<string>>
	message?: string
	searchMessage?: string
	className?: string
}

export const ValidatedPasswordInput = ({
	inputValue,
	setInputValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
}: MinimalistInputProps) => {
	const [focus, setFocus] = useState(false)
	const [isPasswordShow, setPasswordShown] = useState(false)
	const [validationMessage, setValidationMessage] = useState('')
	const [reliabilityLevel, setReliabilityLevel] = useState<
		'red' | 'orange' | 'green' | ''
	>('')

	const validatePassword = useCallback(
		(
			password: string,
			setValidationMessage: React.Dispatch<React.SetStateAction<string>>,
			setReliabilityLevel: React.Dispatch<
				React.SetStateAction<'' | 'red' | 'orange' | 'green'>
			>
		) => {
			if (!password.length) {
				setValidationMessage('')
				setReliabilityLevel('')
				return
			}

			if (password.length < 8) {
				setValidationMessage('Password must be at least 8 characters long!')
				setReliabilityLevel('red')
				return
			}

			const upperCaseRegex = /[A-Z]/
			const lowerCaseRegex = /[a-z]/
			const numberRegex = /[0-9]/

			if (
				!numberRegex.test(password) ||
				!lowerCaseRegex.test(password) ||
				!upperCaseRegex.test(password)
			) {
				setValidationMessage(
					'The password must contain digits, lowercase and capital letters!'
				)
				setReliabilityLevel('red')
				return
			}
			const SpecialSymbolsRegex = /[!@#$%^&*(),.?":{}|<>]/g
			if (!SpecialSymbolsRegex.test(password)) {
				setValidationMessage(
					'Reliable password, the password should contain special symbols (@#$...)!'
				)
				setReliabilityLevel('orange')
				return
			} else {
				setValidationMessage('Strong password')
				setReliabilityLevel('green')
				return
			}
		},
		[]
	)

	return (
		<article className={className}>
			<section className='relative bg-inherit'>
				<article
					className={`transition-all duration-200 bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray after:rounded-none ${
						focus &&
						'dark:text-white dark:after:bg-white text-lightThemeTextDarkGray after:bg-lightThemeTextDarkGray after:rounded-sm after:h-0.5'
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
					{isPasswordShow ? (
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
							type='text'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							className='bg-inherit font-normal focus:font-medium placeholder:text-textGray text-inherit outline-none pointer-events-auto w-full py-1'
						/>
					) : (
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
							onChange={e => setInputValue(e.target.value)}
							className='bg-inherit font-normal focus:font-medium placeholder:text-textGray text-inherit outline-none pointer-events-auto w-full py-1'
						/>
					)}
					{inputValue && (
						<section
							onClick={() => setPasswordShown(!isPasswordShow)}
							className='w-5 h-full cursor-pointer flex justify-center items-center absolute right-4'
						>
							{isPasswordShow ? (
								<OpenEyeIcon
									mainStyles='w-full h-full'
									colorStyles={`${
										focus
											? 'dark:stroke-white stroke-lightThemeTextGray'
											: 'stroke-textGray dark:stroke-lightThemeTextDarkGray'
									}`}
								/>
							) : (
								<ClosedEyeIcon
									mainStyles='w-full h-full'
									colorStyles={`${
										focus
											? 'dark:stroke-white stroke-lightThemeTextGray'
											: 'stroke-textGray dark:stroke-lightThemeTextDarkGray'
									}`}
								/>
							)}
						</section>
					)}
				</article>
				<span
					className={`
						flex absolute z-10 bottom-0 left-4 bg-opacity-100 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none 
						${
							inputValue
								? 'translate-y-4 translate-x-1 sm:translate-x-9 text-sm sm:text-xl px-2 py-0'
								: '-translate-y-1.5 -translate-x-1.5 text-base sm:text-xl bg-opacity-0 px-0.5 py-1'
						}
						${
							focus
								? 'dark:text-white text-lightThemeTextDarkGray font-medium'
								: 'text-textGray font-normal'
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
					{message}
				</span>
			</section>
			{reliabilityLevel && (
				<span
					className={`
					inline-block pt-4 text-base md:text-lg bg-opacity-100 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none origin-top-left
					${focus ? 'font-medium' : 'font-normal'}
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
					{validationMessage}
				</span>
			)}
		</article>
	)
}

/*
'use client'
import React, { useCallback, useState } from 'react'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ClosedEyeIcon } from '../icon/eyes-icons/ui/closed-eye'
import { OpenEyeIcon } from '../icon/eyes-icons/ui/open-eye'

interface MinimalistInputProps {
	inputValue: string
	setInputValue:
		| ActionCreatorWithPayload<string, string>
		| React.Dispatch<React.SetStateAction<string>>
	message?: string
	searchMessage?: string
	className?: string
}

export const ValidatedPasswordInput = ({
	inputValue,
	setInputValue,
	message = 'Input option',
	className = 'w-72 font-medium h-80 ',
}: MinimalistInputProps) => {
	const [focus, setFocus] = useState(false)
	const [isPasswordShow, setPasswordShown] = useState(false)
	const [validationMessage, setValidationMessage] = useState('')
	const [reliabilityLevel, setReliabilityLevel] = useState<
		'red' | 'orange' | 'green' | ''
	>('')

	const validatePassword = useCallback(
		(
			password: string,
			setValidationMessage: React.Dispatch<React.SetStateAction<string>>,
			setReliabilityLevel: React.Dispatch<
				React.SetStateAction<'' | 'red' | 'orange' | 'green'>
			>
		) => {
			if (!password.length) {
				setValidationMessage('')
				setReliabilityLevel('')
				return
			}

			if (password.length < 8) {
				setValidationMessage('Password must be at least 8 characters long!')
				setReliabilityLevel('red')
				return
			}

			const upperCaseRegex = /[A-Z]/
			const lowerCaseRegex = /[a-z]/
			const numberRegex = /[0-9]/

			if (
				!numberRegex.test(password) ||
				!lowerCaseRegex.test(password) ||
				!upperCaseRegex.test(password)
			) {
				setValidationMessage(
					'The password must contain digits, lowercase and capital letters!'
				)
				setReliabilityLevel('red')
				return
			}
			const SpecialSymbolsRegex = /[!@#$%^&*(),.?":{}|<>]/g
			if (!SpecialSymbolsRegex.test(password)) {
				setValidationMessage(
					'Reliable password, the password should contain special symbols (@#$...)!'
				)
				setReliabilityLevel('orange')
				return
			} else {
				setValidationMessage('Strong password')
				setReliabilityLevel('green')
				return
			}
		},
		[]
	)

	return (
		<article className={className}>
			<section className='relative'>
				<article
					className={`transition-all duration-200 bg-inherit text-textGray w-full p-2 flex items-center justify-between rounded relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-textGray after:rounded-none ${
						focus &&
						'dark:text-white dark:after:bg-white text-lightThemeTextDarkGray after:bg-lightThemeTextDarkGray after:rounded-sm after:h-0.5'
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
					{isPasswordShow ? (
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
							type='text'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							className='bg-inherit font-normal focus:font-medium placeholder:text-textGray text-inherit outline-none pointer-events-auto w-full py-1'
						/>
					) : (
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
							onChange={e => setInputValue(e.target.value)}
							className='bg-inherit font-normal focus:font-medium placeholder:text-textGray text-inherit outline-none pointer-events-auto w-full py-1'
						/>
					)}
					{inputValue && (
						<section
							onClick={() => setPasswordShown(!isPasswordShow)}
							className='w-5 h-full cursor-pointer flex justify-center items-center absolute right-4'
						>
							{isPasswordShow ? (
								<OpenEyeIcon
									mainStyles='w-full h-full'
									colorStyles={`${
										focus
											? 'dark:stroke-white stroke-lightThemeTextGray'
											: 'stroke-textGray dark:stroke-lightThemeTextDarkGray'
									}`}
								/>
							) : (
								<ClosedEyeIcon
									mainStyles='w-full h-full'
									colorStyles={`${
										focus
											? 'dark:stroke-white stroke-lightThemeTextGray'
											: 'stroke-textGray dark:stroke-lightThemeTextDarkGray'
									}`}
								/>
							)}
						</section>
					)}
				</article>
				<span
					className={`
						flex absolute z-10 bottom-0 left-4 bg-opacity-100 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none 

						${
							!inputValue &&
							reliabilityLevel &&
							'-translate-y-12 -translate-x-1.5 text-base sm:text-xl bg-opacity-0 px-0.5 py-1'
						}
						${
							!inputValue &&
							!reliabilityLevel &&
							'-translate-y-1.5 -translate-x-1.5 text-base sm:text-xl bg-opacity-0 px-0.5 py-1'
						}
						
						${
							inputValue &&
							reliabilityLevel &&
							'-translate-y-7 translate-x-1 sm:translate-x-9 text-sm sm:text-xl px-2 py-0'
						}
						${
							inputValue &&
							!reliabilityLevel &&
							'translate-y-3 translate-x-1 sm:translate-x-9 text-sm sm:text-xl px-2 py-0'
						}
						${
							focus
								? 'dark:text-white text-lightThemeTextDarkGray font-medium'
								: 'dark:text-darkThemeTextGray text-textGray font-normal'
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
					{message}
				</span>
			</section>
			{reliabilityLevel && (
				<span
					className={`
					inline-block pt-4 text-base md:text-lg bg-opacity-100 bg-inherit transition-all duration-200 ease-in-out select-none pointer-events-none origin-top-left
					${focus ? 'font-medium' : 'font-normal'}
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
					{validationMessage}
				</span>
			)}
		</article>
	)
}

 */
