'use client'
import { TagsManipulator } from './ui/TagsManipulator'
import { GenresManipulator } from './ui/GenresManipulator'

export function TagsAndGenresManipulator() {
	return (
		<article className='bg-inherit flex-col items-center justify-between flex-wrap w-full'>
			<GenresManipulator />
			<TagsManipulator />
		</article>
	)
}
