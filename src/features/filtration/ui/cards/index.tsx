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
			className={`inline-block cursor-pointer mx-3 rounded-lg overflow-hidden w-1/3 
				sm:w-1/4 md:w-1/5 lg:w-1/6 h-full`}
		>
			<article
				className={` hover:bg-hoverBlue dark:hover:bg-orangeHover w-full min-h-12 h-2/3 bg-neutral-50 rounded-t-lg shadow flex items-center justify-between px-2
				bg-no-repeat bg-center bg-cover`}
				style={{ backgroundImage: `url(${image})` }}
			></article>
			<article
				className={`
					flex items-center justify-between h-1/3 p-2 rounded-b-lg transition-all hover:bg-hoverBlue dark:hover:bg-orangeHover dark:border-none border-2 border-t-0 border-lightThemeBorderGray duration-200
					${
						isActive
							? 'dark:bg-orangeActive bg-activeBlue dark:text-black text-white'
							: 'bg-white dark:bg-darkGray text-black dark:text-white'
					}
				`}
			>
				<span className='ml-2'>{title}</span>
				<span className='ml-2'>{tagGameCount}</span>
			</article>
		</section>
	)
}
