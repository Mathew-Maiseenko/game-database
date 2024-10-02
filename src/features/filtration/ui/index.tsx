'use client'
import {
	MinimalistCarousel,
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
import { AppDispatch } from '@/shared/lib'
import { fetchDeveloperList } from '../model/thunk/fetch-developers-list'
import { toggleCardActiveness } from '../lib/toggle-card-activeness'
import type { setGenreType, setParamFoo, setTagType } from '../types'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { TagResult } from '@/shared/api/RawgApi-hook/types/tag'

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

	return (
		<article className='bg-inherit flex-col items-center justify-between flex-wrap w-full'>
			<MinimalistInput
				inputValue={filterTitle}
				setInputValue={setFilterTitle}
				className='w-11/12 font-medium mb-16 bg-inherit'
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
					className='w-11/12 font-medium mb-10'
					message={'Select developer'}
					options={developers.map(developer => developer.name)}
				/>
			) : (
				<div>loading...</div>
			)}
		</article>
	)
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
