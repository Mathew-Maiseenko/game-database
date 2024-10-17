'use client'
import React from 'react'
import { BurgerIcon } from '@/shared/ui'
import { Burger, MainLogo, NavPoint } from '@/entities/navigation'
import { useState } from 'react'
import { ThemeSwitcher } from '@/features/theme-switcher'
import { UserButton } from '@/entities/user'

export function NavBar() {
	const [isBurgerOpen, setBurgerOpen] = useState(false)
	return (
		<>
			<nav className='hidden md:block text-textGray mb-7 p-3'>
				<section className='flex min-w-full justify-between items-center md:flex-wrap sm:flex-wrap'>
					<MainLogo />
					<article className='relative md:order-2 self-center'>
						<NavPoint href='/game-list' title={'Games'} />
					</article>
					<section className='md:order-3 flex items-center'>
						<ThemeSwitcher styles='mr-5' />
						<UserButton />
					</section>
				</section>
			</nav>

			<nav className='block md:hidden text-textGray mb-7 p-2'>
				<section className='flex min-w-full justify-between items-center md:flex-wrap'>
					<MainLogo />
					<Burger isActive={isBurgerOpen} setActive={setBurgerOpen}>
						<aside className='flex flex-col justify-start items-center py-6 px-2'>
							<article className='flex flex-wrap sm:flex-nowrap  justify-between  w-full items-center py-2 px-1.5 mb-2'>
								<BurgerIcon
									isIconActive={isBurgerOpen}
									setIconActive={setBurgerOpen}
								/>
								<ThemeSwitcher styles='sm:mr-2 order-last sm:order-none mx-auto sm:mx-0' />
								<section onClick={() => setBurgerOpen(!isBurgerOpen)}>
									<UserButton styles='w-8 h-8 rounded-full ' />
								</section>
							</article>
							<article>
								<NavPoint
									onClickFunction={() => setBurgerOpen(!isBurgerOpen)}
									href='/game-list'
									title={'Games'}
								/>
							</article>
						</aside>
					</Burger>
				</section>
			</nav>
		</>
	)
}
