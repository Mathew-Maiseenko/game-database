'use client'
import { BurgerIcon } from '@/shared/ui'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

interface BurgerProps {
	isActive: boolean
	setActive: Dispatch<SetStateAction<boolean>>
	children: JSX.Element
}

export function Burger({ children, isActive, setActive }: BurgerProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		if (!isActive) {
			setTimeout(() => {
				setIsOpen(false)
			}, 300)
		} else {
			setIsOpen(true)
		}
	}, [isActive])

	return (
		<section className='overflow-hidden'>
			<BurgerIcon isIconActive={isActive} setIconActive={setActive} />
			{isOpen && (
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
