'use client'

export interface GenreCardProps {
	title: string
	image: string
	isActive: boolean
	setFiltration: any
	tagGameCount: number | null | undefined
}

export const MinimalistFiltrationCarouselCard = ({
	title,
	image,
	isActive,
	setFiltration,
	tagGameCount,
}: GenreCardProps) => {
	return (
		<section
			onClick={setFiltration}
			className={`inline-block cursor-pointer mx-3 rounded-lg overflow-hidden w-36 h-full`}
		>
			<article
				className={` hover:bg-blue w-full min-h-12 h-2/3 bg-neutral-50 rounded-t-lg shadow flex items-center justify-between px-2
				bg-no-repeat bg-center bg-cover`}
				style={{ backgroundImage: `url(${image})` }}
			></article>
			<article
				className={`
					flex items-center justify-between h-1/3 p-2 rounded-b-lg transition-all bg-darkGray text-white duration-200
					${isActive && 'bg-orange text-black'}
				`}
			>
				<span className='ml-2'>{title}</span>
				<span className='ml-2'>{tagGameCount}</span>
			</article>
		</section>
	)
}
