import type { Store } from '@/shared/api'
import { StoreLogoList } from '@/shared/model'
import { cardHoverClass } from '@/shared/styles'
import { ClockIcon, ImageWithFallback, StarIcon } from '@/shared/ui'
import Link from 'next/link'
import { memo } from 'react'

interface GameCardProps {
	id: number
	title: string
	image: string
	rating: number
	playtime: number
	stores?: Store[] | undefined
	genres?: string[]
	sequenceNumber?: number
}

export const GameCard = memo(function GameCard({
	id,
	title,
	image,
	rating,
	playtime,
	stores,
	genres,
	sequenceNumber = 0,
}: GameCardProps) {
	return (
		<li
			className={`${cardHoverClass} flex dark:border-none border-2 border-lightThemeBorderGray bg-white dark:bg-whiteGray w-full sm:w-[49%] lg:w-[24%] min-h-full rounded-xl mb-3 overflow-hidden`}
			style={{
				animation: `cardShowing ${
					0.5 + 0.2 * sequenceNumber
				}s ease-out forwards`,
			}}
		>
			<Link
				href={`/details/${id}`}
				className={`flex flex-col w-full min-h-full`}
			>
				<ImageWithFallback
					srcImage={image}
					width={1280}
					height={720}
					alt='Game poster'
					className='h-3/5 w-full mb-2 object-cover'
				/>

				<article className={`flex flex-col px-1 sm:px-2 md:px-3 pb-2 md:pb-3`}>
					<section className='flex flex-row md:mb-1 justify-between dark:text-white text-black'>
						<article className='text-base sm:text-lg md:text-xl dark:text-white text-black max-w-[70%]'>
							<h3>{title}</h3>
						</article>
						<article className='inline-flex flex-row self-start text-sm sm:text-base md:text-lg items-center dark:text-white text-black mr-0.5'>
							<StarIcon classes='mr-px md:mr-0' />
							<h4>{rating}</h4>
						</article>
					</section>

					<section className='flex flex-row justify-between mb-2'>
						<article className='text-sm sm:text-base md:text-lg text-textGray max-w-[60%]'>
							{genres?.join(', ')}
						</article>
						<article className='text-sm sm:text-base md:text-lg flex flex-row dark:text-white text-black '>
							<ClockIcon classes='dark:fill-white fill-black mr-0.5 sm:mr-1' />
							{playtime}
						</article>
					</section>

					<section className='flex flex-row justify-between'>
						<article className='flex flex-row text-white'>
							{stores ? <StoreLogoList stores={stores} /> : ''}
						</article>
					</section>
				</article>
			</Link>
		</li>
	)
})
