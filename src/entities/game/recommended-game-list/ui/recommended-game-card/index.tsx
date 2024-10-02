import Image from 'next/image'
import getRandomDefaultImage from '@/shared/model/defaultImages'
import { StarIcon } from '@/shared/ui'
import Link from 'next/link'

interface RecommendedGameCardProps {
	id: number
	title: string
	poster: string
	rating: number
	genres?: string[]
}

export function RecommendedGameCard({
	id,
	title,
	poster,
	rating,
	genres,
}: RecommendedGameCardProps) {
	return (
		<section className='flex w-1/2 justify-between relative mb-5 after:h-0.5 after:w-full after:absolute after:-bottom-2 after:bg-grayLineAfterCard'>
			<Link
				href={`http://localhost:3000/details/${id}`}
				className='flex flex-grow'
			>
				<Image
					src={poster || getRandomDefaultImage()}
					width={300}
					height={200}
					alt='Picture of the game'
					className=''
				/>
			</Link>

			<article className='flex flex-col rounded-3xl min-w-[70%] p-3'>
				<section className='flex justify-between'>
					<h3 className='text-xl font-bold text-white'>{title}</h3>
					<section className='flex items-center'>
						<StarIcon />
						<h4 className='text-lg font-bold text-white'>{rating}</h4>
					</section>
				</section>
				<section className='flex justify-between'>
					<h3 className='text-lg font-medium text-textGray'>
						{genres?.join(', ')}
					</h3>
				</section>
			</article>
		</section>
	)
}
