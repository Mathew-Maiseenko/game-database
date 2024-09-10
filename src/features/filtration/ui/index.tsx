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
import type { TagResult } from '@/shared/api/RawgApi-hook/types/tag'
import { MinimalistFiltrationCarouselCard } from './cards'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { fetchFilteredGameList } from '../model/thunk/fetch-filtered-game-list'
import { fetchTagsList } from '../model/thunk/fetch-tags-list'
import { fetchGenresList } from '../model/thunk/fetch-genres-list'
import { AppDispatch } from '@/shared/lib'
import { fetchDeveloperList } from '../model/thunk/fetch-developers-list'

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

type setParamFoo = setTagType | setGenreType

export function GameFiltration() {
	const [filterTitle, setFilterTitle] = useState('')
	const [filterDeveloper, setFilterDeveloper] = useState('')
	// const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	// const [selectedTags, setSelectedTags] = useState<string[]>([])

	const dispatch = useAppDispatch()

	const genres = useAppSelector(filteredGamesSlice.selectors.selectGenreList)
	const tags = useAppSelector(filteredGamesSlice.selectors.selectTagList)
	const developers = useAppSelector(
		filteredGamesSlice.selectors.selectDeveloperList
	)

	// const filterTitle = useAppSelector(
	// 	filteredGamesSlice.selectors.selectFiltrationTitle
	// )
	const activeGenres = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationGenreList
	)
	const activeTags = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationTagList
	)
	const setGenre = filteredGamesSlice.actions.setActiveGenres
	const setTag = filteredGamesSlice.actions.setActiveTags

	//const setFilterTitle = filteredGamesSlice.actions.setTitle

	useEffect(() => {
		console.log('перерисовка с запросом')
		dispatch(
			fetchFilteredGameList({
				gamesPerPage: 0,
				pageNumber: 1,
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
	}, [dispatch, filterTitle, activeGenres, activeTags, filterDeveloper])

	useEffect(() => {
		dispatch(fetchTagsList())
		dispatch(fetchGenresList())
		dispatch(fetchDeveloperList())
	}, [dispatch])
	return (
		<article className=' flex-col items-center justify-between flex-wrap w-full'>
			<MinimalistInput
				inputValue={filterTitle}
				setInputValue={setFilterTitle}
				className='w-11/12 font-medium mb-16'
				message={'Input game title'}
			/>

			{genres.length ? (
				<section className='mb-3'>
					<MinimalistCarousel>
						{...ViewCards(
							dispatch,
							genres,
							activeGenres,
							setGenre as setGenreType
						)}
					</MinimalistCarousel>
				</section>
			) : (
				<div>loading...</div>
			)}

			{tags.length ? (
				<section className='mb-3'>
					<MinimalistCarousel>
						{...ViewCards(dispatch, tags, activeTags, setTag as setTagType)}
					</MinimalistCarousel>
				</section>
			) : (
				<div>loading...</div>
			)}

			{developers.length ? (
				<MinimalistSelect
					selectedOption={filterDeveloper}
					setSelected={setFilterDeveloper}
					withSearch={true}
					searchMessage={'Search developer'}
					className='w-11/12 font-medium'
					message={'Select developer'}
					options={developers.map(developer => developer.name)}
				/>
			) : (
				<div>loading...</div>
			)}
		</article>
	)
}

function toggleCardActiveness(
	dispatch: AppDispatch,
	activeParamName: string,
	activeParam: Genre | TagResult | undefined,
	activeParamStore:
		| Record<string, Genre | undefined>
		| Record<string, TagResult | undefined>,
	activeParamDispatcher: setParamFoo
) {
	if (!activeParamStore[activeParamName] && activeParamName) {
		dispatch(
			activeParamDispatcher({ name: activeParamName, param: activeParam })
		)
	} else if (activeParamStore[activeParamName] && activeParamName) {
		dispatch(activeParamDispatcher({ name: activeParamName, param: undefined }))
	}
}

const ViewCards = (
	dispatch: AppDispatch,
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
