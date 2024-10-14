import Link from 'next/link'

export function WelcomeMessage() {
	return (
		<section className='absolute inline-flex flex-col justify-between min-w-full min-h-[46vh] bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray mb-10 px-10 py-14 rounded-3xl'>
			<h2 className='text-5xl font-bold dark:text-white text-black'>
				Welcome To Cyborg
			</h2>
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
		</section>
	)
}
