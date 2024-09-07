import {
	MinimalistCarousel,
	MinimalistInput,
	//MinimalistMultiSelect,
	MinimalistSelect,
} from '@/shared/ui'
import { filteredGamesSlice } from '../model/filtration-slice'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { useState } from 'react'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { Tag } from '@/shared/api/RawgApi-hook/types/tag'
import { MinimalistFiltrationCarouselCard } from './card'

export function GameFiltration() {
	// const [inputValue, setInputValue] = useState('')
	// const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	// const [selectedTags, setSelectedTags] = useState<string[]>([])

	const genres = useAppSelector(filteredGamesSlice.selectors.selectGenreList)
	const tags = useAppSelector(filteredGamesSlice.selectors.selectTagList)

	const filterTitle = useAppSelector(
		filteredGamesSlice.selectors.selectFiltrationTitle
	)

	const setFilterTitle = filteredGamesSlice.actions.setTitle
	return (
		<article className='flex justify-between flex-wrap w-full'>
			<MinimalistInput
				inputValue={filterTitle}
				setInputValue={setFilterTitle}
				className='w-[22%] font-medium mb-16'
				message={'Input game title'}
			/>

			{genres.length ? (
				<MinimalistCarousel>{...ViewGenreCards(genres)}</MinimalistCarousel>
			) : (
				<div>loading...</div>
			)}

			{tags.length ? (
				<MinimalistCarousel>{...ViewTagCards(tags)}</MinimalistCarousel>
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
function toggleCardActiveness() {
	//!
}

const ViewGenreCards = (genres: Genre[]) =>
	genres.map((genre: Genre) => (
		<MinimalistFiltrationCarouselCard title={genre.name} image={genre.image} setFiltration={() =>}/> //!
	))

const ViewTagCards = (tags: Tag[]) =>
	tags.map((tag: Tag) => (
		<MinimalistFiltrationCarouselCard
			title={tag.name}
			image={tag.image_background}
		/>
	))

{
	/* <MinimalistMultiSelect
				selected={selectedGenres}
				setSelected={setSelectedGenres}
				className='w-[22%] font-medium mb-16'
				message={'Select genres'}
				withSearch={false}
				options={['111', '222', '333']}
			/>
			<MinimalistMultiSelect
				selected={selectedTags}
				setSelected={setSelectedTags}
				className='w-[22%] font-medium mb-16'
				message={'Select tag'}
				withSearch={false}
				options={['111', '222', '333']}
			/> */
}
