'use client'
import { useState } from 'react'
import { BurgerIcon } from '@/shared/ui'
import classes from './styles.module.css'

export function Burger({ children }: { children: JSX.Element }) {
	const [isActive, setActive] = useState<boolean>(false)
	console.log(children)
	return (
		<section className='overflow-hidden'>
			<BurgerIcon isIconActive={isActive} setIconActive={setActive} />
			<article
				className={`bg-whiteGray absolute right-0 top-0 min-h-[200vh] text-center text-white font-medium text-2xl mb-2 z-10 w-1/3 transform transition-all duration-300 ease-in-out ${
					isActive ? '-translate-x-0 block' : 'translate-x-full'
				}`}
			>
				<BurgerIcon isIconActive={isActive} setIconActive={setActive} />
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
