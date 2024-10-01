import Image from 'next/image'
import getRandomDefaultImage from '@/shared/model/defaultImages'
import Link from 'next/link'
import { cardHoverClass } from '@/shared/styles'
import { ClockIcon, StarIcon } from '@/shared/ui'
import { StoreLogoList } from '@/shared/model'
import { Store } from '@/shared/api/RawgApi-hook'

interface GameCardProps {
	id: number
	title: string
	image: string
	rating: number
	playtime: number
	stores?: Store[] | undefined
	genres?: string[]
}

export function GameCard({
	id,
	title,
	image,
	rating,
	playtime,
	stores,
	genres,
}: GameCardProps) {
	return (
		<Link
			href={`/details/${id}`}
			className={`${cardHoverClass} flex flex-col  bg-whiteGray sm:w-[47%] md:w-[24%] min-h-full rounded-xl mb-3`}
		>
			<Image
				src={image || getRandomDefaultImage()}
				width={500}
				height={500}
				alt='Game poster'
				className='h-3/5 w-full rounded-t-xl mb-2 object-cover'
			/>
			<article className={`flex flex-col px-3 pb-3`}>
				<section className='flex flex-row md:mb-1 justify-between .text-white'>
					<article className='text-white'>{title}</article>
					<article className='flex flex-row text-white'>
						<StarIcon classes='self-start' />
						{rating}
					</article>
				</section>
				<section className='flex flex-row justify-between mb-2'>
					<article className='text-textGray'>{genres?.join(',')}</article>
					<article className='flex flex-row text-white'>
						<ClockIcon classes='mr-1' />
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
	)
}
//lg:flex-row  md:flex-col sm:flex-col

/*
import Image from 'next/image'
import star from './../../../../../public/star.svg'
import downloadIcon from './../../../../../public/downloadIcon.svg'
import getRandomDefaultImage from '@/shared/model/defaultImages'
import Link from 'next/link'
import { cardHoverClass } from '@/shared/styles'

interface GameCardProps {
	id: number
	title: string
	image: string
	rating: number
	developer: string
}

export function GameCard({
	id,
	title,
	image,
	rating,
	developer,
}: GameCardProps) {
	return (
		<Link
			href={`/details/${id}`}
			className={`${cardHoverClass} flex flex-col  bg-whiteGray sm:w-[47%] md:w-[23%] min-h-full p-3 rounded-xl mb-3`}
		>
			<Image
				src={image || getRandomDefaultImage()}
				width={500}
				height={500}
				alt='Picture of the author'
				className='mb-2 '
			/>
			<section className='flex flex-row md:mb-1 justify-between .text-white'>
				<article className='text-white'>{title}</article>
				<article className='flex flex-row text-white'>
					<Image
						src={star}
						width={14}
						height={14}
						alt='star'
						className='mr-1'
					/>
					{rating}
				</article>
			</section>
			<section className='flex flex-row justify-between'>
				<article className='text-textGray'>{developer}</article>
				<article className='flex flex-row text-white'>
					<Image
						src={downloadIcon}
						width={14}
						height={14}
						alt='downloadIcon'
						className='mr-1'
					/>
					2.3M
				</article>
			</section>
		</Link>
	)
}
//lg:flex-row  md:flex-col sm:flex-col

*/
