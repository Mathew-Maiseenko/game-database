'use client'
//import { Teko } from 'next/font/google'
import { BurgerIcon, UserButton } from '@/shared/ui'
//import classes from './styles.module.css'
import { Burger, MainLogo, NavPoint } from '@/entities/navigation'
import { useState } from 'react'

export function NavBar() {
	const [isBurgerOpen, setBurgerOpen] = useState(false)
	return (
		<>
			{/* <LogModal /> */}
			<nav
				// style={{ border: '1px solid #fff' }}
				className='hidden md:block text-textGray mb-7 p-3'
			>
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
							<article
								style={{ border: '1px solid #fff' }}
								className='flex justify-between w-full items-center py-1 px-3'
							>
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
{
	/*
							<article
					className={`group ${classes.group} flex flex-row items-center justify-between min-w-[12vw] px-5 font-semibold bg-whiteGray rounded-[35px] relative hover:bg-yellow hover:text-black 
				before:content-["RU/EN"] before:text-yellow before:absolute before:left-[-100px] before:text-2xl md:order-3`}
				>
					<article className='group-hover:text-black group-hover:font-bold text-xl'>
						Profile
					</article>
					<svg
						className='ml-3 fill-textGray group-hover:fill-black'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 32 32'
						xmlSpace='preserve'
					>
						<path d='M16 31C7.729 31 1 24.271 1 16S7.729 1 16 1s15 6.729 15 15-6.729 15-15 15zm0-28C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3z' />
						<path d='M16 20.2a4.605 4.605 0 0 1-4.6-4.6c0-2.537 2.064-4.6 4.6-4.6s4.6 2.063 4.6 4.6c0 2.537-2.064 4.6-4.6 4.6zm0-7.2c-1.434 0-2.6 1.166-2.6 2.6s1.166 2.6 2.6 2.6 2.6-1.167 2.6-2.6S17.434 13 16 13zM16 31c-2.462 0-4.907-.613-7.072-1.772a1.003 1.003 0 0 1-.528-.882V26.33a5.772 5.772 0 0 1 5.765-5.766h3.67a5.772 5.772 0 0 1 5.765 5.766v2.015c0 .368-.204.707-.528.882A15.033 15.033 0 0 1 16 31zm-5.6-3.269c3.48 1.663 7.72 1.663 11.2 0v-1.4a3.77 3.77 0 0 0-3.765-3.766h-3.67a3.77 3.77 0 0 0-3.765 3.766v1.4zm12.2.615h.01-.01z' />
					</svg>
				</article>

*/
	/* <svg
						className='w-10 h-10'
						data-name='Layer 1'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 16 16'
					>
						<path d='M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 15a7 7 0 0 1-5.19-2.32 2.71 2.71 0 0 1 1.7-1 13.11 13.11 0 0 0 1.29-.28 2.32 2.32 0 0 0 .94-.34 1.17 1.17 0 0 0-.27-.7 3.61 3.61 0 0 1-1.32-2.87A3.18 3.18 0 0 1 8 4.07a3.18 3.18 0 0 1 2.86 3.42 3.6 3.6 0 0 1-1.32 2.88 1.13 1.13 0 0 0-.27.69 2.68 2.68 0 0 0 .93.31 10.81 10.81 0 0 0 1.28.23 2.63 2.63 0 0 1 1.78 1A7 7 0 0 1 8 15z' />
					</svg> */
}

/*	
c инпутом
<article className='relative md:order-2'>
					{/* <form id='search' action='#' className='relative md:order-2'> //
					<input
						type='text'
						placeholder='Type Something'
						id='searchText'
						name='searchKeyword'
						className='p-4 min-w-[20vw] min-h-full  rounded-2xl focus:outline-none
						outline-4 focus:outline-orangeBorder bg-whiteGray text-textGray'
					/>
					<svg
						width='24'
						height='24'
						viewBox='0 0 23.999 24.0011'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'
						className='bg-inherit min-h-full absolute right-4 top-0'
					>
						<path
							id='Union'
							d='M12.353 0C5.92139 0 0.707031 5.2146 0.707031 11.6472C0.707031 14.5033 1.73486 17.1193 3.44141 19.1454L0 22.5869L1.41406 24.0011L4.85547 20.5597C6.88135 22.2661 9.49707 23.2943 12.353 23.2943C18.7852 23.2943 23.999 18.0797 23.999 11.6472C23.999 5.2146 18.7852 0 12.353 0ZM12.353 2C7.02588 2 2.70703 6.31915 2.70703 11.6472C2.70703 16.9752 7.02588 21.2943 12.353 21.2943C17.6807 21.2943 21.999 16.9752 21.999 11.6472C21.999 6.31915 17.6807 2 12.353 2Z'
							clip-rule='evenodd'
							fill='#666'
							fill-opacity='1'
							fill-rule='evenodd'
						/>
					</svg>
				</article> 
*/
