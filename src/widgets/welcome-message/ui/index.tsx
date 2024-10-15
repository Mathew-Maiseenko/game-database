import Link from 'next/link'
import { WelcomeMessagePostersScrollingWrapper } from './welcom-message-posters-scrolling-wrapper'

export function WelcomeMessage() {
	return (
		<WelcomeMessagePostersScrollingWrapper>
			<article className='relative z-50 inline-flex flex-col justify-between min-w-full min-h-full dark:border-none px-10 py-14 rounded-3xl overflow-hidden'>
				<h2>Welcome To Cyborg</h2>
				<article className='dark:text-white text-black lg:text-3xl md:text-2xl sm:text-xl dark:font-bold font-bold inline'>
					<h3 className='text-blue dark:text-orange lg:text-4xl md:text-3xl sm:text-2xl inline'>
						Browse{' '}
					</h3>
					Our <br /> Popular Games <br /> Here
				</article>
				<Link
					href={'/game-list'}
					className='dark:bg-orange bg-blue text-lg dark:text-white text-center text-black px-7 py-5 rounded-xl max-w-48 font-bold '
				>
					Browse Now
				</Link>
			</article>
		</WelcomeMessagePostersScrollingWrapper>
	)
}
