'use client'
import type { Genre } from '@/shared/api'
import { fetchApiWrapper } from '@/shared/api'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { Carousel, Modal, MinimalistInput, CrossIcon } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { FiltrationSkeleton } from '@/features/filtration/ui/filtration-skeleton'
import { MinimalistFiltrationCarouselCard } from '@/features/filtration/ui/cards'
import { filteredGamesSlice } from '@/features/filtration'
import { Button } from '@/shared/ui/button'
import styles from './shared.module.css'

export function GenresManipulator() {
	const [genres, setGenres] = useState<Genre[]>([])
	const dispatch = useAppDispatch()
	const reduxStoredGenres = useAppSelector(
		filteredGamesSlice.selectors.selectGenreList,
	)

	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [newGenreName, setNewGenreName] = useState('')
	const [newGenreSlug, setNewGenreSlug] = useState('')
	const [newGenreImage, setNewGenreImage] = useState('')
	const [deleteGenreName, setDeleteGenreName] = useState('')
	const [error, setError] = useState('')

	const fetchGenres = async () => {
		const data = await fetchApiWrapper<Genre[]>(`metadata/genres`)
		setGenres(data)
		dispatch(filteredGamesSlice.actions.initGenres(data))
	}

	useEffect(() => {
		if (reduxStoredGenres.length) {
			setGenres(reduxStoredGenres)
		} else {
			fetchGenres()
		}
	}, [dispatch, reduxStoredGenres])

	const handleAddGenre = async () => {
		if (!newGenreName || !newGenreSlug || !newGenreImage) {
			setError('All fields are required')
			return
		}

		const newGenre: Genre = {
			id: Date.now(),
			name: newGenreName,
			slug: newGenreSlug,
			gamesCount: 0,
			image: newGenreImage,
		}

		const res = await fetch('/api/metadata/genres', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newGenre),
		})

		if (res.ok) {
			await fetchGenres()
			setNewGenreName('')
			setNewGenreSlug('')
			setNewGenreImage('')
			setError('')
			setIsAddModalOpen(false)
		}
	}

	const handleDeleteGenre = async () => {
		const genreToDelete = genres.find(g => g.name === deleteGenreName)
		if (!genreToDelete) {
			setError('Genre not found')
			return
		}

		const res = await fetch('/api/metadata/genres', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: genreToDelete.id }),
		})

		if (res.ok) {
			await fetchGenres()
			setDeleteGenreName('')
			setError('')
			setIsDeleteModalOpen(false)
		}
	}

	if (genres.length) {
		return (
			<section className='mb-3'>
				<Carousel>
					<ViewCards filterParams={genres} />
				</Carousel>
				<section className={styles.controls}>
					<button
						className='w-20 rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black'
						onClick={() => setIsAddModalOpen(true)}
					>
						Add Genre
					</button>
					<button
						className='rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black'
						onClick={() => setIsDeleteModalOpen(true)}
					>
						Delete Genre
					</button>
				</section>

				<Modal
					isOpen={isAddModalOpen}
					setModalCloseFunction={() => setIsAddModalOpen(false)}
				>
					<section
						onClick={e => e.stopPropagation()}
						className='relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray 
				w-4/5 lg:w-3/5 p-5 md:p-6 lg:p-7 rounded-2xl lg:rounded-3xl cursor-default flex flex-col gap-5'
					>
						<header className='flex justify-between items-center mb-2'>
							<h2 className='text-xl font-bold'>Add Genre</h2>
							<div onClick={() => setIsAddModalOpen(false)}>
								<CrossIcon classes='w-6 h-6 cursor-pointer' />
							</div>
						</header>
						<MinimalistInput
							inputValue={newGenreName}
							setInputValue={setNewGenreName}
							message='Genre name'
							className='w-full bg-inherit mb-5'
							withMagnifierIcon={false}
						/>
						<MinimalistInput
							inputValue={newGenreSlug}
							setInputValue={setNewGenreSlug}
							message='Slug'
							className='w-full bg-inherit mb-5'
							withMagnifierIcon={false}
						/>
						<MinimalistInput
							inputValue={newGenreImage}
							setInputValue={setNewGenreImage}
							message='Image URL'
							className='w-full bg-inherit mb-5'
							withMagnifierIcon={false}
						/>
						{error && <p className='text-validationRed text-sm'>{error}</p>}
						<Button onClick={handleAddGenre}>Add</Button>
					</section>
				</Modal>

				<Modal
					isOpen={isDeleteModalOpen}
					setModalCloseFunction={() => setIsDeleteModalOpen(false)}
				>
					<section
						onClick={e => e.stopPropagation()}
						className='relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray 
				w-4/5 lg:w-3/5 p-5 md:p-6 lg:p-7 rounded-2xl lg:rounded-3xl cursor-default'
					>
						<header className='flex justify-between items-center mb-2'>
							<h2 className='text-xl font-bold'>Delete Genre</h2>
							<div onClick={() => setIsDeleteModalOpen(false)}>
								<CrossIcon classes='w-6 h-6 cursor-pointer' />
							</div>
						</header>
						<MinimalistInput
							inputValue={deleteGenreName}
							setInputValue={setDeleteGenreName}
							message='Genre name to delete'
							className='w-full bg-inherit mb-5'
							withMagnifierIcon={false}
						/>
						{error && <p className='text-validationRed text-sm'>{error}</p>}
						<Button onClick={handleDeleteGenre}>Delete</Button>
					</section>
				</Modal>
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
			title={`id:${genre.id})${genre.name}`}
			image={genre.image}
			isActive={false}
			setFiltration={() => {}}
		/>
	))
}
