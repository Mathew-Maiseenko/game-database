'use client'
import type { TagResult } from '@/shared/api'
import { fetchApiWrapper } from '@/shared/api'
import { Carousel } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { FiltrationSkeleton } from '@/features/filtration/ui/filtration-skeleton'
import { MinimalistFiltrationCarouselCard } from '@/features/filtration/ui/cards'

export function TagsManipulator() {
	const [tags, setTags] = useState<TagResult[]>([])

	useEffect(() => {
		fetchApiWrapper<TagResult[]>(`metadata/tags`).then(setTags)
	}, [])

	if (tags.length) {
		return (
			<section className='mb-3'>
				<Carousel>
					<ViewCards filterParams={tags} />
				</Carousel>
			</section>
		)
	} else {
		return <FiltrationSkeleton />
	}
}

const ViewCards = ({ filterParams }: { filterParams: TagResult[] }) => {
	return filterParams.map((tag: TagResult) => (
		<MinimalistFiltrationCarouselCard
			key={`${tag.name}-${tag.id}`}
			title={tag.name}
			image={tag.image}
			isActive={false}
			setFiltration={() => {}}
		/>
	))
}
