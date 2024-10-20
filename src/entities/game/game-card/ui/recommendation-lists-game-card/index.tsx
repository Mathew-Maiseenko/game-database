import { ImageWithFallback, StarIcon } from '@/shared/ui'
import Link from 'next/link'

interface RecommendedGameCardProps {
	id: number
	title: string
	poster: string
	rating: number
	genres?: string[]
}

export function RecommendationListsGameCard({
	id,
	title,
	poster,
	rating,
	genres,
}: RecommendedGameCardProps) {
	//w-2/6
	return (
		<li className='flex flex-col sm:flex-row w-full md:max-w-[49%] justify-between relative mb-5 after:h-0.5 after:w-full after:absolute after:-bottom-2 dark:after:bg-grayLineAfterCard after:bg-lightThemeBorderGray'>
			<Link
				href={`http://localhost:3000/details/${id}`}
				className='flex justify-center items-center flex-grow sm:h-full w-full sm:w-auto'
			>
				<ImageWithFallback
					src={poster}
					width={300}
					height={200}
					alt='Picture of the game'
					className=''
				/>
			</Link>

			<article className='flex flex-row justify-between sm:flex-col sm:justify-start rounded-3xl min-w-full sm:min-w-[70%] p-3'>
				<section className='flex sm:flex-row flex-col justify-between mb-1 md:mb-2'>
					<h3 className='text-lg md:text-xl font-bold text-black dark:text-white'>
						{title}
					</h3>
					<section className='flex items-center'>
						<StarIcon />
						<h4 className='text-base md:text-lg font-bold text-black dark:text-white'>
							{rating}
						</h4>
					</section>
				</section>
				<section className='flex justify-between'>
					<h3 className='text-base md:text-lg font-medium text-textGray'>
						{genres?.join(', ')}
					</h3>
				</section>
			</article>
		</li>
	)
}
