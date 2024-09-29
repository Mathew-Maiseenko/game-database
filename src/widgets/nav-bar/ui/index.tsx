'use client'

import { BurgerIcon, UserButton } from '@/shared/ui'
import { Burger, MainLogo, NavPoint } from '@/entities/navigation'
import { useState } from 'react'

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
					<UserButton />
				</section>
			</nav>
			<nav className='block md:hidden text-textGray mb-7 p-3'>
				<section className='flex min-w-full justify-between md:flex-wrap sm:flex-wrap'>
					<MainLogo />
					<Burger isActive={isBurgerOpen} setActive={setBurgerOpen}>
						<>
							<article className='flex justify-between w-full items-center py-1 px-3'>
								<BurgerIcon
									isIconActive={isBurgerOpen}
									setIconActive={setBurgerOpen}
								/>
								<section onClick={() => setBurgerOpen(!isBurgerOpen)}>
									<UserButton />
								</section>
							</article>
							<NavPoint
								onClickFunction={() => setBurgerOpen(!isBurgerOpen)}
								href='/game-list'
								title={'Games'}
							/>
						</>
					</Burger>
				</section>
			</nav>
		</>
	)
}
