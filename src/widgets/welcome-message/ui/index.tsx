export async function WelcomeMessage() {
	return (
		<section className='inline-flex flex-col justify-between min-w-full min-h-[46vh] bg-darkGray mb-10 px-10 py-14 rounded-3xl'>
			<h2 className='text-base text-white'>Welcome To Cyborg</h2>
			<article className='text-white text-3xl font-bold inline'>
				<h3 className='text-orange md:text-4xl sm:text-3xl inline'>Browse </h3>
				Our <br /> Popular Games <br /> Here
			</article>
			<button className='bg-orange text-sm text-white py-3 rounded-xl max-w-36'>
				Browse Now
			</button>
		</section>
	)
}
