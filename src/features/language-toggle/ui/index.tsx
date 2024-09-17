'use client'
import { useState } from 'react'

export function LanguageToggle() {
	const [isRussian, setIsRussian] = useState<boolean>(false)
	return (
		<button
			onClick={() => setIsRussian(!isRussian)}
			className={`flex flex-row items-center justify-between font-semibold bg-whiteGray relative
      sm:rounded-full md:rounded-4xl sm:px-1 sm:py-1
      md:px-5 md:py-1 md:order-3
      hover:bg-yellow hover:text-black`}
		>
			<h3 className='sm:hidden md:inline group-hover:text-black text-xl bg-blue'>
				<span className={`${isRussian ? 'text-yellow' : 'text-textGray'}`}>
					RU
				</span>
				/
				<span className={`${isRussian ? 'text-textGray' : 'text-yellow'}`}>
					EN
				</span>
			</h3>
		</button>
	)
}

/*
 before:content-["RU/EN"] before:text-yellow before:absolute 
 before:left-[-100px] before:text-2xl
*/
