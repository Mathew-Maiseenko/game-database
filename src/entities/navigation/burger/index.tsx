'use client'
import { BurgerIcon } from '@/shared/ui'
import { useState, type Dispatch, type SetStateAction } from 'react'

interface BurgerProps {
	isActive: boolean
	setActive: Dispatch<SetStateAction<boolean>>
	children: JSX.Element
}

export function Burger({ children, isActive, setActive }: BurgerProps) {
	const [isFirstOpeningHappened, setIsFirstOpeningHappened] =
		useState<boolean>(false)

	return (
		<section className='overflow-hidden'>
			<article
				onClick={() => {
					if (!isFirstOpeningHappened) {
						setIsFirstOpeningHappened(true)
					}
				}}
			>
				<BurgerIcon isIconActive={isActive} setIconActive={setActive} />
			</article>
			{isFirstOpeningHappened && (
				<article
					className={`bg-mainBgColor border-l-2 border-lightThemeBorderGray dark:border-none dark:bg-whiteGray absolute right-0 top-0 bottom-0 min-h-full text-center text-white font-medium text-2xl mb-2 z-50 w-1/3 transform transition-all duration-300 ease-in-out ${
						isActive ? 'block animate-slide-in' : 'animate-slide-out'
					}`}
				>
					{children}
				</article>
			)}
		</section>
	)
}
