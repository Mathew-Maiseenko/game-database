'use client'
import Image from 'next/image'

export interface GenreCardProps {
	title: string
	image: string
	isActive: boolean
	setFiltration: any
	tagGameCount: number | null | undefined
}
//bg-[url('${image})'] bg-no-repeat bg-center bg-cover h-screen

//${
//					isActive ? 'bg-gray' : 'bg-pink'
//				}
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
			className={`cursor-pointer mx-3 rounded-lg overflow-hidden w-36 h-full`}
		>
			<article
				className={` hover:bg-blue w-full min-h-12 h-2/3 bg-neutral-50 rounded-t-lg shadow flex items-center justify-between px-2
				bg-no-repeat bg-center bg-cover`}
				style={{ backgroundImage: `url(${image})` }}
			>
				{/* <Image src={image} alt={`${title} icon`} width={1080} height={720} /> */}
			</article>
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
