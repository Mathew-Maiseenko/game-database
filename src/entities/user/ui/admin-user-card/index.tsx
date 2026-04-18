'use client'

import React, { useState } from 'react'
import { baseSiteUrl } from '@/shared/model'
import { UserInfoInServerMongo } from '../../types'
import { Modal } from '@/shared/ui'

interface UserCardProps {
	user: UserInfoInServerMongo
	onDelete?: (userId: string) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const gamesCount = Object.keys(user.games).length
	const favCount = user.favoriteGamesIds.length

	const handleDelete = async () => {
		setIsDeleting(true)
		setError(null)
		try {
			const response = await fetch(`${baseSiteUrl}/api/user/${user.userId}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				const errData = await response.json()
				throw new Error(errData.error || 'Ошибка удаления')
			}

			setIsDeleteModalOpen(false)
			onDelete?.(user.userId)
		} catch (err: any) {
			setError(err.message)
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<>
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow'>
				<div className='flex justify-between items-start mb-3'>
					<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
						{user.userName}
					</h3>
					<span className='text-xs text-gray-500 dark:text-gray-400'>
						ID: {user.userId}
					</span>
				</div>

				<div className='space-y-1 text-sm text-gray-600 dark:text-gray-300'>
					<div className='grid grid-cols-2 gap-2'>
						<span className='font-medium'>CPU:</span>
						<span>{user.CPU || '—'}</span>

						<span className='font-medium'>GPU:</span>
						<span>{user.GPU || '—'}</span>

						<span className='font-medium'>RAM:</span>
						<span>{user.RAM} GB</span>

						<span className='font-medium'>VRAM:</span>
						<span>{user.graphicsMemory} GB</span>
					</div>

					<div className='border-t pt-2 mt-2'>
						<div className='flex justify-between'>
							<span>🎮 Игр в библиотеке:</span>
							<span className='font-medium'>{gamesCount}</span>
						</div>
						<div className='flex justify-between'>
							<span>⭐ Избранных:</span>
							<span className='font-medium'>{favCount}</span>
						</div>
					</div>
				</div>

				<button
					onClick={() => setIsDeleteModalOpen(true)}
					className='flex text-white justify-center items-center bg-accountExitRed rounded-2xl p-2 font-semibold'
				>
					Удалить пользователя
				</button>
			</div>

			{/* Модальное окно подтверждения удаления */}
			<Modal
				isOpen={isDeleteModalOpen}
				setModalCloseFunction={() => setIsDeleteModalOpen(false)}
			>
				<section
					onClick={e => e.stopPropagation()}
					className='relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray
            w-4/5 lg:w-3/5 p-5 md:p-6 lg:p-7 rounded-2xl lg:rounded-3xl cursor-default flex flex-col gap-5'
				>
					<h2 className='text-xl font-bold text-gray-900 dark:text-white'>
						Подтверждение удаления
					</h2>

					<p className='text-gray-700 dark:text-gray-300'>
						Вы действительно хотите удалить пользователя{' '}
						<strong>{user.userName}</strong>?
						<br />
						Это действие нельзя будет отменить.
					</p>

					{error && (
						<div className='bg-red-100 text-red-700 p-3 rounded-md text-sm'>
							{error}
						</div>
					)}

					<div className='flex justify-end gap-3 mt-4'>
						<button
							type='button'
							onClick={() => setIsDeleteModalOpen(false)}
							disabled={isDeleting}
							className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-50'
						>
							Отмена
						</button>
						<button
							type='button'
							onClick={handleDelete}
							disabled={isDeleting}
							className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{isDeleting ? 'Удаление...' : 'Удалить'}
						</button>
					</div>
				</section>
			</Modal>
		</>
	)
}

export default UserCard
