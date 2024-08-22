export async function ComputerSpecifications() {
	return (
		<article className='flex flex-col text-white w-[30%]'>
			<h2 className='text-center inline-block w-full text-white font-medium text-2xl mb-2 underline'>
				Характеристики компьютера:
			</h2>
			<article className='flex flex-col justify-between w-full h-full pb-5'>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>Процессор:</h3>
					<h4>Intel Core i5</h4>
				</section>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>Видеокарта:</h3>
					<h4>Amd</h4>
				</section>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>Размер видеопамяти:</h3>
					<h4>6ГБ</h4>
				</section>
				<section className='flex flex-row relative justify-between after:h-[2px] after:w-full after:absolute after:bottom-[-10px] after:bg-grayLineAfterCard'>
					<h3>ОЗУ:</h3>
					<h4>32ГБ</h4>
				</section>
			</article>
		</article>
	)
}
