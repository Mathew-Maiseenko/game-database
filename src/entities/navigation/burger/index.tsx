'use client'
import { BurgerIcon } from '@/shared/ui'
import type { Dispatch, SetStateAction } from 'react'

interface BurgerProps {
	isActive: boolean
	setActive: Dispatch<SetStateAction<boolean>>
	children: JSX.Element
}

export function Burger({ children, isActive, setActive }: BurgerProps) {
	//const [isActive, setActive] = useState<boolean>(false)
	return (
		<section className='overflow-hidden'>
			<BurgerIcon isIconActive={isActive} setIconActive={setActive} />
			<article
				className={`bg-whiteGray absolute right-0 top-0 bottom-0 min-h-full text-center text-white font-medium text-2xl mb-2 z-10 w-1/3 transform transition-all duration-300 ease-in-out ${
					isActive ? '-translate-x-0' : 'translate-x-full'
				}`}
			>
				{children}
			</article>
		</section>
	)
}

/*
;<article className='bg-whiteGray absolute right-0 top-0 min-h-[200vh] text-center text-white font-medium text-2xl mb-2 underline z-10 w-1/4'>
	бургер
</article>
*/
