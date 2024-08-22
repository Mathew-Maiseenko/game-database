import { ExtendedGameCardsList } from '@/widgets/another-raited-games-list'
import { GameDetailsMain } from '@/widgets/game-details-main'

export default async function GameDetailsPage() {
	return (
		<>
			<GameDetailsMain />
			<ExtendedGameCardsList />
		</>
	)
}

/*	

			{/* <section className='flex flex-col bg-darkGray rounded-3xl p-5 mb-5'>
				<PairOfGameInfoCards />
				<ListOfGameScreenshots />
				<h3 className='text-textGray text-base mb-5'>
					Cyborg Gaming is free HTML CSS website template provided by
					TemplateMo. This is Bootstrap v5.2.0 layout. You can make a small
					contribution via PayPal to info [at] templatemo.com and thank you for
					supporting. If you want to get the PSD source files, please contact
					us. Lorem ipsum dolor sit consectetur es dispic dipiscingei elit, sed
					doers eiusmod lisum hored tempor.
				</h3>
				<section className='flex flex-row'>
					<button className='rounded-3xl border-2 border-orange p-1 text-orange'>
						Download Fortnite Now!
					</button>
					<button className='rounded-3xl border-2 border-orange p-1 text-orange'>
						Add Fortnite to favorite list
					</button>
				</section>
			</section> 











<section className='flex w-1/2 justify-between relative  after:h-[2px] after:w-full after:absolute after:bottom-[-5px] after:bg-[#353637]'>
							<Image
								src={false || GameDefaultImages[getRandomInt(0, 7)]}
								width={80}
								height={80}
								alt='Picture of the author'
								className=''
							/>
							<article className='flex flex-col rounded-3xl min-w-[70%] p-3'>
								<section className='flex justify-between'>
									<h3 className='text-xl font-bold text-white'>Fortnite</h3>
									<section className='flex items-center'>
										<Image
											src={star}
											width={20}
											height={20}
											className='mr-1'
											alt='second game photo'
										/>
										<h4 className='text-lg font-bold text-white'>4.8</h4>
									</section>
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
							</article>
						</section> */
