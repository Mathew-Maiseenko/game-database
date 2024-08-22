export async function GameStatistics() {
	return (
		<article className='flex flex-col relative text-white w-[30%] after:h-full after:w-[1px] after:absolute after:right-[-18px]  after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-white font-medium text-2xl mb-2 underline'>
				Статистика:
			</h2>
			<article className='flex flex-col justify-between w-full h-full pb-5'>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>Звание:</h3>
					<h4>Рядовой геймер</h4>
				</section>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>Игр в избранном:</h3>
					<h4>3</h4>
				</section>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>Пройденных игр:</h3>
					<h4>2</h4>
				</section>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>Любимые жанры:</h3>
					<h4>Shooter</h4>
				</section>
			</article>
		</article>
	)
}
