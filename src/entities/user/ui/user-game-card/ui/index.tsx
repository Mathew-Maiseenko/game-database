'use client'
import classes from './style.module.css'
import { DownloadIcon, TickIcon, TriplePointIcon } from '@/shared/ui'
import { GarbageIcon } from '@/shared/ui/icon/garbage-icon'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { userSlice } from '@/entities/user/model/user-slice'
import Link from 'next/link'
import { useState } from 'react'
import { saveRemovingFavoriteGameFromLocalStorage } from '@/entities/user/lib/local-storage-functions/save-removing-favorite-game-from-local-storage'
import { saveTogglingFavoriteGameСompletionInLocalStorage } from '@/entities/user/lib/local-storage-functions/save-toggling-favorite-game-completion-in-local-storage'

export function UsersOpeningActionsMenuButton({
	id,
	website,
}: {
	id: number
	website?: string | null
}) {
	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	return (
		<article
			className={`${classes.icon} ${isMenuOpened && classes.activeIcon}
			 ${classes.message} ${isMenuOpened && classes.activeMessage}`}
		>
			<section
				className={`${classes.tooltip} ${
					isMenuOpened &&
					'dark:bg-white bg-darkGray dark:before:bg-white before:bg-darkGray'
				}`}
			>
				<article className='flex flex-col md:flex-row gap-1'>
					<button
						onClick={() => {
							dispatch(userSlice.actions.toggleFavoriteGameComplete(id))
							saveTogglingFavoriteGameСompletionInLocalStorage(id)
						}}
						className='dark:bg-darkGray bg-white text-white rounded-full p-2 lg:p-3'
					>
						<TickIcon classes='w-5 h-5 dark:stroke-white stroke-black' />
					</button>

					{website && (
						<Link
							href={website}
							className='dark:bg-darkGray bg-white text-white rounded-full p-2 lg:p-3'
						>
							<DownloadIcon classes='w-5 h-5 dark:fill-white fill-black' />
						</Link>
					)}

					<button
						className='dark:bg-darkGray bg-white text-white rounded-full p-2 lg:p-3'
						onClick={() => {
							dispatch(userSlice.actions.removeFavoriteGame(id))
							saveRemovingFavoriteGameFromLocalStorage(id)
						}}
					>
						<GarbageIcon classes='w-5 h-5 dark:fill-white fill-black' />
					</button>
				</article>
			</section>
			<span
				className='flex justify-center items-center w-8 h-8 rounded-full'
				onClick={() => setIsMenuOpened(!isMenuOpened)}
			>
				<TriplePointIcon
					classes='w-2/3 h-2/3'
					loaderIconClasses={
						isMenuOpened
							? 'dark:fill-orange dark:stroke-orange fill-blue stroke-blue'
							: 'dark:fill-white dark:stroke-white fill-black stroke-black'
					}
				/>
			</span>
		</article>
	)
}
