import CardWithStatisticalInfo from './ui/card-with-statistical-info'

export function PairOfGameInfoCards() {
	return (
		<section className='flex justify-between bg-pink'>
			<CardWithStatisticalInfo />
		</section>
	)
}

/*

export function PairOfGameInfoCards() {
	return (
		<section className='flex justify-between bg-pink'>
			<section className='flex flex-col bg-whiteGray rounded-3xl w-[48%] p-7'>
				<section className='flex justify-between'>
					<h2 className='text-xl font-bold text-white'>Fortnite</h2>
					<article className='flex items-center'>
						<Image
							src={star}
							width={20}
							height={20}
							className='mr-1'
							alt='second game photo'
						/>
						<h4 className='text-lg font-bold text-white'>4.8</h4>
					</article>
				</section>
				<section className='flex justify-between'>
					<h3 className='text-lg font-medium text-textGray'>Sandbox</h3>
					<section className='flex items-center'>
						<Image
							src={downloadIcon}
							width={20}
							height={20}
							className='mr-1'
							alt='second game photo'
						/>
						<h4 className='text-lg font-bold text-white'>2.3M</h4>
					</section>
				</section>
			</section>
			<section className='flex flex-row justify-between bg-whiteGray rounded-3xl w-[48%] p-7 '>
				<article className='flex flex-col justify-between items-center'>
					<Image
						src={star}
						width={20}
						height={20}
						className='mr-1'
						alt='second game photo'
					/>
					<h4 className='text-lg font-bold text-white'>4.8</h4>
				</article>
				<article className='flex flex-col justify-between items-center'>
					<Image
						src={downloadIcon}
						width={20}
						height={20}
						className='mr-1'
						alt='second game photo'
					/>
					<h4 className='text-lg font-bold text-white'>2.3M</h4>
				</article>
				<article className='flex flex-col justify-between items-center'>
					<Image
						src={downloadIcon}
						width={20}
						height={20}
						className='mr-1'
						alt='second game photo'
					/>
					<h4 className='text-lg font-bold text-white'>3</h4>
				</article>
				<article className='flex flex-col justify-between items-center'>
					<Image
						src={downloadIcon}
						width={20}
						height={20}
						className='mr-1'
						alt='second game photo'
					/>
					<h4 className='text-lg font-bold text-white'>4</h4>
				</article>
			</section>
		</section>
	)
}


*/
