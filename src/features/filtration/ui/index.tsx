'use client'
import { Carousel, MinimalistSelect } from '@/shared/ui'
import { filteredGamesSlice } from '../model/filtration-slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { MinimalistFiltrationCarouselCard } from './cards'
import { useEffect, useState } from 'react'
import { fetchFilteredGameList } from '../model/thunk/fetch-filtered-game-list'
import { toggleCardActiveness } from '../lib/toggle-card-activeness'
import type { setGenreType, setTagType, ViewCardsProps } from '../types'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { TagResult } from '@/shared/api/RawgApi-hook/types/tag'
import { FiltrationSkeleton } from './filtration-skeleton'
import { InputWithDebounce } from './input-with-debounce'
import { DeveloperResult, RawgApi } from '@/shared/api/RawgApi-hook'
export function GameFiltration() {
	const [filterTitle, setFilterTitle] = useState('')
	const [filterDeveloper, setFilterDeveloper] = useState('')
	const [genres, setGenres] = useState<Genre[]>([])
	const [tags, setTags] = useState<TagResult[]>([])
	const [developers, setDevelopers] = useState<DeveloperResult[]>([])
	const dispatch = useAppDispatch()

	const activeGenres = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationGenreList
	)
	const activeTags = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationTagList
	)
	const activePage = useAppSelector(
		filteredGamesSlice.selectors.selectActivePage
	)

	const reduxStoredGenres = useAppSelector(
		filteredGamesSlice.selectors.selectGenreList
	)

	const setGenre = filteredGamesSlice.actions.setActiveGenres
	const setTag = filteredGamesSlice.actions.setActiveTags

	useEffect(() => {
		let activeDeveloperFetchingParam: string = ''

		if (filterDeveloper) {
			activeDeveloperFetchingParam = developers
				.filter(developer => developer.name === filterDeveloper)[0]
				.id.toString()
		}

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
				developers: activeDeveloperFetchingParam,
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
		RawgApi.getTagsList().then(setTags)
		RawgApi.getDevelopersList().then(setDevelopers)

		if (reduxStoredGenres.length) {
			setGenres(reduxStoredGenres)
		} else {
			RawgApi.getGenresList().then(genres => {
				setGenres(genres)
				dispatch(filteredGamesSlice.actions.initGenres(genres))
			})
		}
	}, [dispatch])

	const loadingState = genres.length && tags.length && developers.length

	if (loadingState) {
		return (
			<article className='bg-inherit flex-col items-center justify-between flex-wrap w-full'>
				<InputWithDebounce
					filtrationValue={filterTitle}
					setFiltrationValue={setFilterTitle}
					className='w-full font-medium mb-16 bg-inherit mx-auto'
					message={'Input game title'}
				/>
				<section className='mb-3'>
					<Carousel>
						<ViewCards
							dispatch={dispatch}
							filterParams={genres}
							activeFiltrationParams={activeGenres}
							setParam={setGenre as setGenreType}
						/>
					</Carousel>
				</section>

				<section className='mb-3'>
					<Carousel>
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
		return <FiltrationSkeleton />
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
