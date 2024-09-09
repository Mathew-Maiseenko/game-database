'use client'
import Image from 'next/image'

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
			onClick={() => {
				setFiltration()
			}}
			className={`cursor-pointer mx-3`}
		>
			<article
				className={` ${
					isActive ? 'bg-gray' : 'bg-pink'
				} hover:bg-blue w-[150px] h-[50px] bg-neutral-50 rounded-lg shadow flex items-center justify-between px-2`}
			>
				<Image src={image} alt={`${title} icon`} width={20} height={20} />
				<span className='ml-2'>{title}</span>
				<span className='ml-2'>{tagGameCount}</span>
			</article>
		</section>
	)
}

/*
// function toggleCardActiveness(
// 	activeParamName: string,
// 	activeParam: Genre | TagResult | undefined,
// 	activeParamStore: Record<string, Genre | TagResult | undefined>,
// 	activeParamDispatcher: setParamFoo
// ) {
// 	// | Tag
// 	if (activeParamStore[activeParamName]) {
// 		activeParamDispatcher({ name: activeParamName, param: activeParam })
// 	} else if (!activeParamStore[activeParamName] && activeParamName) {
// 		activeParamDispatcher({ name: activeParamName, param: undefined })
// 	}
// }

// const ViewCards = (
// 	filterParams: Genre[] | TagResult[],
// 	setParam: setParamFoo
// ) => {
// 	const activeGenres = useAppSelector(
// 		filteredGamesSlice.selectors.selectFiltrationGenreList
// 	)
// 	const setGenre = filteredGamesSlice.actions.setActiveGenres
// 	return filterParams.map((filterParam: Genre | TagResult) => (
// 		<MinimalistFiltrationCarouselCard
// 			key={`${filterParam.name}-${filterParam.id}`}
// 			title={filterParam.name}
// 			image={filterParam.image}
// 			isActive
// 			setFiltration={() =>
// 				toggleCardActiveness(
// 					filterParam.name,
// 					filterParam,
// 					activeGenres,
// 					setParam
// 				)
// 			}
// 		/> //!
// 	))
// }

// // const ViewTagCards = (tags: Tag[]) =>
// // 	tags.map((tag: Tag) => (
// // 		<MinimalistFiltrationCarouselCard
// // 			title={tag.name}
// // 			image={tag.image_background}
// // 		/>
// // 	))
*/
