'use client'
import type { Genre } from '@/shared/api'
import { fetchApiWrapper } from '@/shared/api'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { Carousel } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { FiltrationSkeleton } from '@/features/filtration/ui/filtration-skeleton'
import { MinimalistFiltrationCarouselCard } from '@/features/filtration/ui/cards'
import { filteredGamesSlice } from '@/features/filtration'

export function GenresManipulator() {
	const [genres, setGenres] = useState<Genre[]>([])
	const dispatch = useAppDispatch()
	const reduxStoredGenres = useAppSelector(
		filteredGamesSlice.selectors.selectGenreList,
	)

	useEffect(() => {
		if (reduxStoredGenres.length) {
			setGenres(reduxStoredGenres)
		} else {
			fetchApiWrapper<Genre[]>(`metadata/genres`).then(genres => {
				setGenres(genres)
				dispatch(filteredGamesSlice.actions.initGenres(genres))
			})
		}
	}, [dispatch, reduxStoredGenres])

	if (genres.length) {
		return (
			<section className='mb-3'>
				<Carousel>
					<ViewCards filterParams={genres} />
				</Carousel>
			</section>
		)
	} else {
		return <FiltrationSkeleton />
	}
}

const ViewCards = ({ filterParams }: { filterParams: Genre[] }) => {
	return filterParams.map((genre: Genre) => (
		<MinimalistFiltrationCarouselCard
			key={`${genre.name}-${genre.id}`}
			title={genre.name}
			image={genre.image}
			isActive={false}
			setFiltration={() => {}}
		/>
	))
}
