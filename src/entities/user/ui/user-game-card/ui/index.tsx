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
				<article className='flex gap-1'>
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

{
	/* <button className='flex justify-center items-center bg-white p-2 md:p-3 lg:p-4 h-1/2 text-white rounded-md mb-1'>
							<DownloadIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button> */
}
{
	/* <button
						onClick={() =>
							dispatch(userSlice.actions.toggleFavoriteGameComplete(id))
						}
              
						className='bg-green text-white mb-1 font-semibold rounded-md py-1 px-3'
					>
						Complete
					</button> */
}

{
	/* <button className='flex justify-center items-center bg-downloadGameButton py-1 px-3 h-1/2 text-white rounded-md mb-1'>
							<DownloadIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button> */
}
{
	/* <button
							className='flex justify-center items-center bg-gameDeleteRedLightTheme p-2 md:p-3 lg:p-4 text-white rounded-full'
							onClick={() => dispatch(userSlice.actions.removeFavoriteGame(id))}
						>
							<GarbageIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button> */
}

/*
interface HoverIconWithTextProps {
	title: string
}
export function HoverIconWithText({ title }: HoverIconWithTextProps) {
	return (
		<article className='m-5 text-center cursor-pointer flex flex-col items-center justify-center relative z-10 transition duration-400 ease-out'>
			<section className='absolute top-0 z-0 bg-white text-white p-2.5 text-lg font-medium rounded-full opacity-0 pointer-events-none shadow-lg transition duration-400 ease-out transform hover:top-[-100px] hover:flex hover:opacity-100 hover:pointer-events-auto'>
				{title}
			</section>
			<span className='p-1 flex items-center justify-center flex-col relative z-10 rounded-full shadow-md transition duration-400 ease-out transform hover:text-white hover:text-shadow-md'>
				<TriplePointIcon classes='w-8 h-8' />
			</span>
		</article>
	)
}
*/
