import Link from 'next/link'
import { WelcomeMessagePostersScrollingWrapper } from './welcom-message-posters-scrolling-wrapper'

export function WelcomeMessage() {
	return (
		<WelcomeMessagePostersScrollingWrapper>
			<article className='relative z-50 text-white flex flex-col justify-between min-w-full min-h-full dark:border-none sm:px-7 md:px-10 sm:py-3 md:py-5 xl:py-7 rounded-3xl overflow-hidden '>
				<h2 className='text-white md:text-xl sm:text-md mb-2'>
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
					className='dark:bg-orange bg-blue text-lg text-white text-center px-7 py-5 rounded-xl max-w-48 font-bold'
				>
					Browse Now
				</Link>
			</article>
		</WelcomeMessagePostersScrollingWrapper>
	)
}
