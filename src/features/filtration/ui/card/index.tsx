import Image from 'next/image'

export interface GenreCardProps {
	title: string
	image: string
	setFiltration: any
}

export const MinimalistFiltrationCarouselCard = ({
	title,
	image,
	setFiltration,
}: GenreCardProps) => {
	return (
		<section className='mx-3'>
			<article className='w-[150px] h-[50px] bg-neutral-50 rounded-lg shadow flex items-center px-2'>
				<Image src={image} alt={`${title} genre icon`} />
				<span className='ml-2'>{title}</span>
			</article>
		</section>
	)
}
