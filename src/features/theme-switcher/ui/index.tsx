'use client'
import { MoonIcon } from './icons/moon-icon'
import { SunIcon } from './icons/sun-icon'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { themeSwitcherSlice } from '../model/theme-switcher-slice'
import { saveCurrentTheme } from '../lib/save-current-theme'

export function ThemeSwitcher({ styles }: { styles?: string }) {
	const dispatch = useAppDispatch()

	const isThemeDark = useAppSelector(
		themeSwitcherSlice.selectors.selectIsThemeDark
	)

	return (
		<section
			onClick={() => {
				dispatch(themeSwitcherSlice.actions.toggleActiveTheme())
				saveCurrentTheme(isThemeDark)
			}}
			className={`relative top-1 ${styles}`}
		>
			<input
				id='themeSwitcher'
				type='checkbox'
				className={`appearance-none md:w-16 w-12 sm:w-14 h-6 md:h-8 inline-block box-border rounded-full overflow-hidden outline-none dark:bg-yellow bg-blue cursor-pointer 
        transition-all duration-300 ease-in-out 
        `}
			/>
			<article
				className={`flex justify-center items-center p-4 md:p-5 absolute w-6 h-6 rounded-full text-white text-center leading-8 transition-all duration-300 ease-in-out cursor-pointer -top-0.5 md:-top-1 bg-white
        ${isThemeDark ? '-left-1 rotate-0' : 'left-8 rotate-45'} 
        `}
			>
				{isThemeDark ? <MoonIcon /> : <SunIcon />}
			</article>
		</section>
	)
}
