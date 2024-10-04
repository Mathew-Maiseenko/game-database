'use client'
import {
	ArrowIcon,
	Carousel,
	Loader,
	MinimalistInput,
	MinimalistSelect,
} from '@/shared/ui'
import { filteredGamesSlice } from '../model/filtration-slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { MinimalistFiltrationCarouselCard } from './cards'
import { useEffect, useState } from 'react'
import { fetchFilteredGameList } from '../model/thunk/fetch-filtered-game-list'
import { fetchTagsList } from '../model/thunk/fetch-tags-list'
import { fetchGenresList } from '../model/thunk/fetch-genres-list'
import { fetchDeveloperList } from '../model/thunk/fetch-developers-list'
import { toggleCardActiveness } from '../lib/toggle-card-activeness'
import type { setGenreType, setTagType, ViewCardsProps } from '../types'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { TagResult } from '@/shared/api/RawgApi-hook/types/tag'
import { FiltrationSkeleton } from './filtration-skeleton'

export function GameFiltration() {
	const [filterTitle, setFilterTitle] = useState('')
	const [filterDeveloper, setFilterDeveloper] = useState('')

	const dispatch = useAppDispatch()

	const genres = useAppSelector(filteredGamesSlice.selectors.selectGenreList)
	const tags = useAppSelector(filteredGamesSlice.selectors.selectTagList)
	const developers = useAppSelector(
		filteredGamesSlice.selectors.selectDeveloperList
	)
	const activeGenres = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationGenreList
	)
	const activeTags = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationTagList
	)
	const activePage = useAppSelector(
		filteredGamesSlice.selectors.selectActivePage
	)

	const setGenre = filteredGamesSlice.actions.setActiveGenres
	const setTag = filteredGamesSlice.actions.setActiveTags

	useEffect(() => {
		dispatch(
			fetchFilteredGameList({
				gamesPerPage: 0,
				pageNumber: activePage,
				title: filterTitle,
				genres: Object.values(activeGenres)
					.reduce((acc, genre) => (genre ? `${acc}${genre.id},` : acc), '')
					.slice(0, -1),
				tags: Object.values(activeTags)
					.reduce((acc, tag) => (tag ? `${acc}${tag.id},` : acc), '')
					.slice(0, -1),
				year: 0,
				developers: filterDeveloper,
			})
		)
	}, [
		dispatch,
		filterTitle,
		activeGenres,
		activeTags,
		filterDeveloper,
		activePage,
	])

	useEffect(() => {
		dispatch(fetchTagsList())
		dispatch(fetchGenresList())
		dispatch(fetchDeveloperList())
	}, [dispatch])

	const loadingState = genres.length && tags.length && developers.length

	if (loadingState) {
		return (
			<article className='bg-inherit flex-col items-center justify-between flex-wrap w-full'>
				<MinimalistInput
					inputValue={filterTitle}
					setInputValue={setFilterTitle}
					className='w-full font-medium mb-16 bg-inherit mx-auto'
					message={'Input game title'}
				/>
				<section className='mb-3'>
					<Carousel
						rightIcon={<ArrowIcon styles='w-full transform -rotate-90' />}
						leftIcon={<ArrowIcon styles='w-full transform rotate-90' />}
					>
						<ViewCards
							dispatch={dispatch}
							filterParams={genres}
							activeFiltrationParams={activeGenres}
							setParam={setGenre as setGenreType}
						/>
					</Carousel>
				</section>

				<section className='mb-3'>
					<Carousel
						rightIcon={<ArrowIcon styles='w-full transform -rotate-90' />}
						leftIcon={<ArrowIcon styles='w-full transform rotate-90' />}
					>
						<ViewCards
							dispatch={dispatch}
							filterParams={tags}
							activeFiltrationParams={activeTags}
							setParam={setTag as setTagType}
						/>
					</Carousel>
				</section>

				<MinimalistSelect
					selectedOption={filterDeveloper}
					setSelected={setFilterDeveloper}
					withSearch={true}
					searchMessage={'Search developer'}
					className='w-full font-medium mb-10 mx-auto'
					message={'Select developer'}
					options={developers.map(developer => developer.name)}
				/>
			</article>
		)
	} else {
		return (
			<FiltrationSkeleton />
			/*<section className='flex justify-center w-full p-3 mb-10'>
				<Loader classes='w-1/4' />
			</section>*/
		)
	}
}

const ViewCards = ({
	dispatch,
	filterParams,
	activeFiltrationParams,
	setParam,
}: ViewCardsProps) => {
	return filterParams.map((filterParam: Genre | TagResult) => (
		<MinimalistFiltrationCarouselCard
			key={`${filterParam.name}-${filterParam.id}`}
			title={filterParam.name}
			image={filterParam.image}
			isActive={!!activeFiltrationParams[filterParam.name]}
			tagGameCount={filterParam.gamesCount}
			setFiltration={() =>
				toggleCardActiveness(
					dispatch,
					filterParam.name,
					filterParam,
					activeFiltrationParams,
					setParam
				)
			}
		/>
	))
}
