'use client'
import { TagsManipulator } from './ui/TagsManipulator'
import { GenresManipulator } from './ui/GenresManipulator'
import { DevelopersManipulator } from './ui/DevelopersManipulator'

export function TagsAndGenresManipulator() {
	return (
		<article className='bg-inherit flex-col items-center justify-between flex-wrap w-full'>
			<h3 className='text-2xl font-bold mb-8 text-black dark:text-white'>
				Жанры
			</h3>
			<GenresManipulator />
			<h3 className='text-2xl font-bold mb-8 text-black dark:text-white'>
				Теги
			</h3>
			<TagsManipulator />
			<h3 className='text-2xl font-bold mb-8 text-black dark:text-white'>
				Разработчики
			</h3>
			<DevelopersManipulator />
		</article>
	)
}
