'use client'

import { MoonIcon } from './icons/moon-icon'
import { SunIcon } from './icons/sun-icon'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { themeSwitcherSlice } from '../model/theme-switcher-slice'

export function ThemeSwitcher({ styles }: { styles?: string }) {
	const dispatch = useAppDispatch()

	const isThemeDark = useAppSelector(
		themeSwitcherSlice.selectors.selectIsThemeDark
	)

	return (
		<section
			onClick={() => dispatch(themeSwitcherSlice.actions.toggleActiveTheme())}
			className={`relative ${styles}`}
		>
			<input
				id='themeSwitcher'
				type='checkbox'
				className={`appearance-none w-16 h-8 inline-block box-border rounded-full overflow-hidden outline-none dark:bg-yellow bg-blue cursor-pointer 
        transition-all duration-300 ease-in-out
        `}
			/>
			<span
				className={`flex justify-center items-center p-5 absolute w-6 h-6 rounded-full text-white text-center leading-8 transition-all duration-300 ease-in-out cursor-pointer -top-1 bg-white
        ${isThemeDark ? '-left-1 rotate-0' : 'left-8 rotate-45'} 
        `}
			>
				{isThemeDark ? <MoonIcon /> : <SunIcon />}
			</span>
		</section>
	)
}

/*

${isThemeDark ? 'border-none' : ''}

before:content-[''] before:block before:absolute before:w-6 before:h-6 before:bg-black before:rounded-full

bg-white

.ThemeToggle

  appearance: none
  width: 62px
  height: 32px
  display: inline-block
  position: relative
  border-radius: 50px
  overflow: hidden
  outline: none
  border: none
  cursor: pointer
  background: red
  transition: background-color ease 0.3s

  &::before
    content: url('https://shivanarrthine.com/public/images/icons/moon.svg')
    display: block
    position: absolute
    z-index: 2
    width: 24px
    height: 24px
    background: #000
    left: 4px
    top: 4px
    border-radius: 50%
    text-indent: 4px
    line-height: 32px
    word-spacing: 37px
    color: #fff
    white-space: nowrap
    transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s

  &:checked
    background-color: #fff
    border-color: #000

    &::before
      left: 32px
      content: url('https://shivanarrthine.com/public/images/icons/sun.svg')
      background: none  
*/
