'use client'
import type { TagResult } from '@/shared/api'
import { fetchApiWrapper } from '@/shared/api'
import { Carousel, Modal, MinimalistInput, CrossIcon } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { FiltrationSkeleton } from '@/features/filtration/ui/filtration-skeleton'
import { MinimalistFiltrationCarouselCard } from '@/features/filtration/ui/cards'
import { Button } from '@/shared/ui/button'
import styles from './shared.module.css'

export function TagsManipulator() {
	const [tags, setTags] = useState<TagResult[]>([])

	const [selectedTag, setSelectedTag] = useState<TagResult | null>(null)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [newTagName, setNewTagName] = useState('')
	const [newTagSlug, setNewTagSlug] = useState('')
	const [newTagImage, setNewTagImage] = useState('')
	const [error, setError] = useState('')

	const fetchTags = async () => {
		const data = await fetchApiWrapper<TagResult[]>(`metadata/tags`)
		setTags(data)
	}

	useEffect(() => {
		fetchTags()
	}, [])

	const handleAddTag = async () => {
		if (!newTagName || !newTagSlug || !newTagImage) {
			setError('All fields are required')
			return
		}

		const newTag: TagResult = {
			id: Date.now(),
			name: newTagName,
			slug: newTagSlug,
			image: newTagImage,
			language: 'eng',
			gamesCount: 0,
		}

		const res = await fetch('/api/metadata/tags', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTag),
		})

		if (res.ok) {
			await fetchTags()
			setNewTagName('')
			setNewTagSlug('')
			setNewTagImage('')
			setError('')
			setIsAddModalOpen(false)
		}
	}

	const handleDeleteTag = async () => {
		if (!selectedTag) {
			setError('No tag selected')
			return
		}

		setIsDeleteModalOpen(false)
		const res = await fetch('/api/metadata/tags', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: selectedTag.id }),
		})

		if (res.ok) {
			await fetchTags()
			setError('')
			setSelectedTag(null)
		}
	}

	const handleCardClick = (tag: TagResult) => {
		setSelectedTag(prev => (prev?.id === tag.id ? null : tag))
	}

	if (tags.length) {
		return (
			<section className='mb-3'>
				<Carousel>
					<ViewCards
						filterParams={tags}
						selectedTag={selectedTag}
						onCardClick={handleCardClick}
					/>
				</Carousel>
				<section className={styles.controls}>
					<button
						className='w-20 rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black'
						onClick={() => setIsAddModalOpen(true)}
					>
						Add Tag
					</button>
					<button
						className='rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black'
						onClick={() => {
							if (!selectedTag) {
								setError('Please select a tag to delete')
								return
							}
							setError('')
							setIsDeleteModalOpen(true)
						}}
					>
						Delete Tag
					</button>
				</section>
				{error && !isAddModalOpen && !isDeleteModalOpen && (
					<p className='text-validationRed text-sm mt-2'>{error}</p>
				)}

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
							<h2 className='text-xl font-bold'>Add Tag</h2>
							<div onClick={() => setIsAddModalOpen(false)}>
								<CrossIcon classes='w-6 h-6 cursor-pointer' />
							</div>
						</header>
						<MinimalistInput
							inputValue={newTagName}
							setInputValue={setNewTagName}
							message='Tag name'
							className='w-full bg-inherit mb-5'
							withMagnifierIcon={false}
						/>
						<MinimalistInput
							inputValue={newTagSlug}
							setInputValue={setNewTagSlug}
							message='Slug'
							className='w-full bg-inherit mb-5'
							withMagnifierIcon={false}
						/>
						<MinimalistInput
							inputValue={newTagImage}
							setInputValue={setNewTagImage}
							message='Image URL'
							className='w-full bg-inherit mb-5'
							withMagnifierIcon={false}
						/>
						{error && isAddModalOpen && (
							<p className='text-validationRed text-sm'>{error}</p>
						)}
						<Button onClick={handleAddTag}>Add</Button>
					</section>
				</Modal>

				<Modal
					isOpen={isDeleteModalOpen}
					setModalCloseFunction={() => setIsDeleteModalOpen(false)}
				>
					<section
						onClick={e => e.stopPropagation()}
						className='relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray
				 p-5 md:p-6 lg:p-7 rounded-2xl lg:rounded-3xl cursor-default flex flex-col gap-5'
					>
						<header className='flex justify-between items-center mb-2'>
							<h2 className='text-xl font-bold'>Delete Tag</h2>
							<div onClick={() => setIsDeleteModalOpen(false)}>
								<CrossIcon classes='w-6 h-6 cursor-pointer' />
							</div>
						</header>
						<p className='text-base  w-full text-center'>
							Are you sure you want to delete tag:{' '}
							<span className='font-bold'>{selectedTag?.name}</span>?
						</p>
						{error && isDeleteModalOpen && (
							<p className='text-validationRed text-sm'>{error}</p>
						)}
						<Button onClick={handleDeleteTag}>Delete</Button>
					</section>
				</Modal>
			</section>
		)
	} else {
		return <FiltrationSkeleton />
	}
}

const ViewCards = ({
	filterParams,
	selectedTag,
	onCardClick,
}: {
	filterParams: TagResult[]
	selectedTag: TagResult | null
	onCardClick: (tag: TagResult) => void
}) => {
	return filterParams.map((tag: TagResult) => (
		<MinimalistFiltrationCarouselCard
			key={`${tag.name}-${tag.id}`}
			title={`id:${tag.id})-${tag.name}`}
			image={tag.image}
			isActive={selectedTag?.id === tag.id}
			setFiltration={() => onCardClick(tag)}
		/>
	))
}
