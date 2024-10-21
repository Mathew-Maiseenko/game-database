'use client'
import Link from 'next/link'

export function NotFoundPage() {
	return (
		<article>
			<section className='flex flex-col items-center w-80 h-80 border-2 border-solid border-lightThemeTextGray rounded-xl bg-white mx-auto my-0 mt-24 md:mt-10  scale-[0.6] md:scale-[0.8] lg:scale-100'>
				<section className='w-[340px] h-7 border-4 border-[#383a41] rounded-md ml-0 mt-12'>
					<section className='h-1/3 w-full bg-[#eb6d6d]'></section>
					<section className='h-1/3 w-full bg-white'></section>
					<section className='h-1/3 w-full bg-activeBlue'></section>
				</section>
				<section className='w-32 mx-auto my-0 mb-12 mt-10 before:inline-block before:w-8 before:h-4 before:border-8 before:border-solid before:border-[#383a41] before:mr-5 before:rounded-tl-3xl before:rounded-tr-3xl before:border-b-0 after:inline-block after:w-8 after:h-4 after:border-8 after:border-solid after:border-[#383a41] after:ml-5 after:rounded-tl-3xl after:rounded-tr-3xl after:border-b-0'></section>
				<section
					className='relative w-44 mx-auto my-0 mt-4 before:absolute before:inline-block before:w-2.5 before:h-2.5 before:right-6 before:rounded-full before:bg-[rgba(235,_109,_109,_0.4)] after:absolute after:-top-5 after:inline-block after:w-2.5 after:h-2.5 after:left-6 after:rounded-full before:-top-5
				after:bg-[rgba(235,_109,_109,_0.4)]'
				></section>
				<section className='w-10 h-1 rounded-md bg-[#383a41] mx-auto my-0'></section>
			</section>
			<h1 className='font-extrabold dark:text-darkThemeTextGray text-lightThemeTextDarkGray text-center xl:text-5xl pt-5 md:pl-5 md:pr-5 lg:text-4xl text-3xl'>
				Oops! Something went wrong!
			</h1>
			<Link
				href={'http://localhost:3000/'}
				className='font-normal p-5 bg-blue dark:bg-orange text-white dark:text-black w-1/2 mx-auto my-0 text-center text-xl rounded-md cursor-pointer mt-20 mb-12 transition-all duration-200 linear md:mx-auto md:my-0 md:mt-14 md:mb-12 md:w-48 hover:bg-hoverBlue dark:hover:bg-orangeHover hover:transition-all hover:duration-200 hover:linear'
			>
				Return to Home
			</Link>
		</article>
	)
}
