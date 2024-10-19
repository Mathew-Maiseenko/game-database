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

/*

export function NotFoundPage() {
	return (
		<article>
			<section className='w-[300px] h-[300px] border-2 border-[solid] border-pink rounded-xl bg-white mx-auto my-0 mt-[100px] [@media_screen_and(max-width:400px)]:mt-[40px] [@media_screen_and(max-width:400px)]:scale-[0.8]'>
				<section className='w-[350px] h-[27px] border-[4px] border-[solid] border-[#383a41] rounded-[5px] -ml-[25px] mt-[50px] before:inline-block before:h-[27px] before:w-[30px] before:bg-[rgba(255,_255,_255,_0.3)] before:absolute after:inline-block after:h-[27px] after:w-[30px] after:bg-[rgba(56,_58,_65,_0.3)] after:absolute after:right-0 after:-mt-[27px]'>
					<section className='h-[calc(100% / 3)] w-full bg-[#eb6d6d]'></section>
					<section className='h-[calc(100% / 3)] w-full bg-[#ffffff]'></section>
					<section className='h-[calc(100% / 3)] w-full bg-[#5e7fdc]'></section>
				</section>
				<section className='w-[128px] mx-[auto] my-[0] mt-[40px] before:inline-block  before:w-[30px]  before:h-[15px]  before:border-[7px]  before:border-[solid]  before:border-[#383a41]  before:mr-[20px]  before:rounded-tl-[22px]  before:rounded-tr-[22px]  before:border-b-0 after:inline-block after:w-[30px] after:h-[15px] after:border-[7px] after:border-[solid] after:border-[#383a41] after:ml-[20px] after:rounded-tl-[22px] after:rounded-tr-[22px] after:border-b-[0]'></section>
				<section className='w-[180px] mx-[auto] my-[0] mt-[15px] before:inline-block before:w-[10px] before:h-[10px] before:mr-[80px] before:rounded-[50%] before:bg-[rgba(235,_109,_109,_0.4)] after:inline-block after:w-[10px] after:h-[10px] after:ml-[80px] after:rounded-[50%] after:bg-[rgba(235,_109,_109,_0.4)]'></section>
				<section className='w-[40px] h-[5px] rounded-[5px] bg-[#383a41] mx-[auto] my-[0] mt-[25px]'></section>
			</section>

			<h1 className='font-extrabold text-[#383a41] text-center text-[2.5em] pt-[20px] [@media_screen_and(max-width:400px)]:pl-[20px] [@media_screen_and(max-width:400px)]:pr-[20px] [@media_screen_and(max-width:400px)]:text-[2em]'>
				Oops! Something went wrong!
			</h1>
			<section className='font-normal p-[20px] bg-[#5e7fdc] text-[white] w-[320px] mx-[auto] my-[0] text-center text-[1.2em] rounded-[5px] cursor-pointer mt-[80px] mb-[50px] [transition:all_0.2s_linear] [@media_screen_and(max-width:400px)]:mx-[auto] [@media_screen_and(max-width:400px)]:my-[0] [@media_screen_and(max-width:400px)]:mt-[60px] [@media_screen_and(max-width:400px)]:mb-[50px] [@media_screen_and(max-width:400px)]:w-[200px] hover:bg-[rgba(94,_127,_220,_0.8)] hover:[transition:all_0.2s_linear]'>
				Return to Home
			</section>
		</article>
	)
}

export function NotFoundPage() {
	return (
		<article>
			<section className='face'>
				<section className='band'>
					<section className='red'></section>
					<section className='white'></section>
					<section className='blue'></section>
				</section>
				<section className='eyes'></section>
				<section className='dimples'></section>
				<section className='mouth'></section>
			</section>

			<h1>Oops! Something went wrong!</h1>
			<section className='btn'>Return to Home</section>
		</article>
	)
}
 */
