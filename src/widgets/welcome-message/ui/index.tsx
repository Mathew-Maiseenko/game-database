import Link from 'next/link'
import { WelcomeMessagePostersScrollingWrapper } from './welcome-message-posters-scrolling-wrapper'

export function WelcomeMessage() {
	return (
		<WelcomeMessagePostersScrollingWrapper>
			<article className='relative z-20 text-white flex flex-grow flex-col justify-between min-w-full min-h-full dark:border-none sm:px-7 md:px-10 lg:px-12 xl:px-14 sm:py-7 md:py-10 xl:py-16 rounded-3xl overflow-hidden'>
				<h2 className='text-white sm:text-lg md:text-2xl lg:text-3xl mb-2'>
					Welcome To Cyborg
				</h2>
				<article className='text-white lg:text-3xl md:text-2xl sm:text-xl dark:font-bold font-bold inline mb-5'>
					<h3 className='text-blue dark:text-orange lg:text-4xl md:text-3xl sm:text-2xl inline'>
						Browse{' '}
					</h3>
					Our <br /> Popular Games <br /> Here
				</article>
				<Link
					href={'/game-list'}
					className='dark:bg-orange bg-blue sm:text-lg lg:text-xl text-white text-center sm:px-7 sm:py-5 md:px-12 md:py-6 lg:px-10 lg:py-7 rounded-xl sm:max-w-48 lg:max-w-64 font-bold'
				>
					Browse Now
				</Link>
			</article>
		</WelcomeMessagePostersScrollingWrapper>
	)
}
