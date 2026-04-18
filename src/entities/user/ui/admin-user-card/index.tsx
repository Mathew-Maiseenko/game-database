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
	const [showGames, setShowGames] = useState(false)

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
			<div className='bg-white dark:bg-whiteGray dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow'>
				<div className='flex justify-between items-start mb-3'>
					<h3 className='text-lg font-semibold text-gray-900 text-black dark:text-white'>
						{user.userName}
					</h3>
					<span className='text-xs text-gray-500 dark:text-gray-400 text-black dark:text-white'>
						ID: {user.userId}
					</span>
				</div>

				<div className='text-black dark:text-white space-y-1 text-sm text-gray-600 dark:text-gray-300'>
					<div className='grid grid-cols-2 gap-2'>
						<h6>
							<span className='font-bold'>CPU:</span>
							<span>{user.CPU || '—'}</span>
						</h6>

						<h6>
							<span className='font-bold'>GPU:</span>
							<span>{user.GPU || '—'}</span>
						</h6>

						<h6>
							<span className='font-bold'>RAM:</span>
							<span>{user.RAM} GB</span>
						</h6>

						<h6>
							<span className='font-bold'>VRAM:</span>
							<span>{user.graphicsMemory} GB</span>
						</h6>
					</div>

					<div className='border-t pt-2 mt-2'>
						<div className='flex justify-between'>
							<span>🎮 Всего игр:</span>
							<span className='font-medium'>{gamesCount}</span>
						</div>
					</div>
				</div>

				{/* Кнопка показа игр */}
				{favCount > 0 && (
					<button
						onClick={() => setShowGames(!showGames)}
						className='mt-3 bg-gray-200 dark:bg-gray-700 text-gray-800 text-white text-sm p-2 rounded hover:bg-gray-300 dark:bg-orange bg-blue transition-colors mb-2'
					>
						{showGames ? 'Скрыть игры' : 'Показать игры'}
					</button>
				)}

				{/* Список избранных игр с прогрессом */}
				{showGames && (
					<div className='mt-3 max-h-60 overflow-y-auto border rounded p-2 bg-gray-50 dark:bg-gray-900 text-black dark:text-white'>
						<ul className='space-y-2'>
							{user.favoriteGamesIds.map(gameId => {
								const gameData = user.games[gameId]
								const isComplete = gameData?.isComplete ?? false
								const achievements = Object.keys(
									gameData?.completedAchievementIds || {},
								).join(', ')
								return (
									<li
										key={gameId}
										className='flex items-center justify-between text-sm'
									>
										<span className='font-medium'>GAME ID: {gameId}.</span>
										<span>Completed achievements: {achievements}</span>
										<span
											className={`px-2 py-1 rounded text-xs ${
												isComplete
													? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
													: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
											}`}
										>
											{isComplete ? 'Пройдена' : 'Не пройдена'}
										</span>
									</li>
								)
							})}
						</ul>
					</div>
				)}

				<button
					onClick={() => setIsDeleteModalOpen(true)}
					className='flex text-white justify-center items-center bg-accountExitRed rounded-2xl p-2 font-semibold mb-2'
				>
					Удалить пользователя
				</button>
			</div>

			{/* Модальное окно удаления (с вашими стилями) */}
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
