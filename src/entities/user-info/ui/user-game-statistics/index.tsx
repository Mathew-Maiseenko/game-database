export function GameStatistics() {
	return (
		<article className='flex flex-col relative text-white sm:mr-0 md:mr-5 lg:mr-10 sm:w-full md:w-1/3 after:h-full after:w-[1px] after:absolute md:after:-right-2 lg:after:-right-5 sm:after:bg-none md:after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-white font-medium text-2xl mb-2 underline'>
				Статистика:
			</h2>
			<article className='flex flex-col justify-between w-full h-full pb-5 sm:text-md md:text-lg'>
				<section
					className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute 
				md:after:-bottom-2.5 sm:after:-bottom-1 after:bg-grayLineAfterCard md:mb-0 sm:mb-2'
				>
					<h3>Звание:</h3>
					<h4>Рядовой геймер</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-0.5 after:bg-grayLineAfterCard md:mb-0 sm:mb-2'>
					<h3>Игр в избранном:</h3>
					<h4>3</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-0.5 after:bg-grayLineAfterCard md:mb-0 sm:mb-2'>
					<h3>Пройденных игр:</h3>
					<h4>2</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-0.5 after:bg-grayLineAfterCard'>
					<h3>Любимые жанры:</h3>
					<h4>Shooter</h4>
				</section>
			</article>
		</article>
	)
}
