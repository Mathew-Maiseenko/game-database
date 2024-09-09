'use client'
import {
	MinimalistCarousel,
	MinimalistInput,
	//MinimalistMultiSelect,
	MinimalistSelect,
} from '@/shared/ui'
import { filteredGamesSlice } from '../model/filtration-slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { Tag, TagResult } from '@/shared/api/RawgApi-hook/types/tag'
import { MinimalistFiltrationCarouselCard } from './cards'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { fetchFilteredGameList } from '../model/thunk/fetch-filtered-game-list'
import { fetchTagsList } from '../model/thunk/fetch-tags-list'
import { fetchGenresList } from '../model/thunk/fetch-genres-list'

type setGenreType = ActionCreatorWithPayload<
	{
		name: string
		param: TagResult | Genre | undefined
	},
	'gamesFilteredList/setActiveGenres'
>
type setTagType = ActionCreatorWithPayload<
	{
		name: string
		param: TagResult | Genre | undefined
	},
	'gamesFilteredList/setActiveTags'
>

export function GameFiltration() {
	// const [developerName, setDeveloperName] = useState('')
	// const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	// const [selectedTags, setSelectedTags] = useState<string[]>([])

	const dispatch = useAppDispatch()

	const genres = useAppSelector(filteredGamesSlice.selectors.selectGenreList)
	const tags = useAppSelector(filteredGamesSlice.selectors.selectTagList)

	const filterTitle = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationTitle
	)
	const activeGenres = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationGenreList
	)
	const activeTags = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationTagList
	)
	const setGenre = filteredGamesSlice.actions.setActiveGenres
	const setTag = filteredGamesSlice.actions.setActiveTags

	const setFilterTitle = filteredGamesSlice.actions.setTitle
	console.log('active params', activeTags, activeGenres)

	useEffect(() => {
		console.log('перерисовка с запросом')

		dispatch(
			fetchFilteredGameList({
				gamesPerPage: 8,
				pageNumber: 1,
				title: filterTitle,
				genres: Object.values(activeGenres)
					.reduce((acc, genre) => (genre ? `${acc}${genre.name},` : acc), '')
					.slice(0, -2),
				tags: Object.values(activeTags)
					.reduce((acc, genre) => (genre ? `${acc}${genre.name},` : acc), '')
					.slice(0, -2),
				year: 0,
				developers: '',
			})
		)
	}, [dispatch, filterTitle, activeGenres, activeTags])
	useEffect(() => {
		dispatch(fetchTagsList())
		dispatch(fetchGenresList())
	}, [])
	return (
		<article className='flex justify-between flex-wrap w-full'>
			<MinimalistInput
				inputValue={filterTitle}
				setInputValue={setFilterTitle}
				className='w-[22%] font-medium mb-16'
				message={'Input game title'}
			/>

			{genres.length ? (
				<section className='mb-3'>
					<MinimalistCarousel>
						{...ViewCards(genres, activeGenres, setGenre as setGenreType)}
					</MinimalistCarousel>
				</section>
			) : (
				<div>loading...</div>
			)}

			{tags.length ? (
				<MinimalistCarousel>
					{...ViewCards(tags, activeTags, setTag as setTagType)}
				</MinimalistCarousel>
			) : (
				<div>loading...</div>
			)}

			<MinimalistSelect
				className='w-[22%] font-medium'
				message={'Select developer'}
				options={['aweff', 'adfwadw']}
			/>
		</article>
	)
}

type setParamFoo = setTagType | setGenreType

function toggleCardActiveness(
	activeParamName: string,
	activeParam: Genre | TagResult | undefined,
	activeParamStore:
		| Record<string, Genre | undefined>
		| Record<string, TagResult | undefined>,
	activeParamDispatcher: setParamFoo
) {
	if (!activeParamStore[activeParamName] && activeParamName) {
		console.log('yes', activeParam)
		activeParamDispatcher({ name: activeParamName, param: activeParam })
		console.log(activeParamName, activeParamStore, activeParamDispatcher)
	} else if (activeParamStore[activeParamName] && activeParamName) {
		console.log('set active undefined')
		activeParamDispatcher({ name: activeParamName, param: undefined })
	}
}

const ViewCards = (
	filterParams: Genre[] | TagResult[],
	activeFiltrationParams:
		| Record<string, Genre | undefined>
		| Record<string, TagResult | undefined>,
	setParam: setParamFoo
) => {
	console.log(activeFiltrationParams)

	return filterParams.map((filterParam: Genre | TagResult) => (
		<MinimalistFiltrationCarouselCard
			key={`${filterParam.name}-${filterParam.id}`}
			title={filterParam.name}
			image={filterParam.image}
			isActive={!!activeFiltrationParams[filterParam.name]}
			tagGameCount={filterParam.gamesCount}
			setFiltration={() =>
				toggleCardActiveness(
					filterParam.name,
					filterParam,
					activeFiltrationParams,
					setParam
				)
			}
		/>
	))
}
