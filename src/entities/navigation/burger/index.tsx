'use client'
import { useState } from 'react'
import { BurgerIcon } from '@/shared/ui'

export function Burger({ children }: { children: JSX.Element }) {
	const [isActive, setActive] = useState<boolean>(false)
	console.log(children)
	return (
		<>
			<BurgerIcon isIconActive={isActive} setIconActive={setActive} />
			<article
				className={`${
					isActive ? 'block' : 'hidden'
				} bg-whiteGray absolute right-0 top-0 min-h-[200vh] text-center text-white font-medium text-2xl mb-2 z-10 w-1/3 transform transition-transform duration-1000 ease-in-out ${
					isActive ? '-translate-x-0' : '-translate-x-1/3'
				}`}
			>
				<BurgerIcon isIconActive={isActive} setIconActive={setActive} />
				{children}
			</article>
		</>
	)
}

/*
;<article className='bg-whiteGray absolute right-0 top-0 min-h-[200vh] text-center text-white font-medium text-2xl mb-2 underline z-10 w-1/4'>
	бургер
</article>
*/
