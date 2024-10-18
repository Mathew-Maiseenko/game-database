'use client'
import classes from './style.module.css'
import { DownloadIcon, TickIcon, TriplePointIcon } from '@/shared/ui'
import { GarbageIcon } from '@/shared/ui/icon/garbage-icon'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { userSlice } from '@/entities/user/model/user-slice'
import Link from 'next/link'

export function UsersOpeningActionsMenuButton({
	id,
	website,
}: {
	id: number
	website?: string | null
}) {
	const dispatch = useAppDispatch()

	return (
		<article className='flex flex-col px-6 text-5xl font-bold'>
			<article className={`${classes.icon} ${classes.message}`}>
				<section className={`${classes.tooltip}`}>
					<article className='flex'>
						<button
							onClick={() =>
								dispatch(userSlice.actions.toggleFavoriteGameComplete(id))
							}
							className='bg-white text-white mb-1 font-semibold rounded-full p-2 md:p-3 lg:p-4'
						>
							<TickIcon classes='w-5 h-5 dark:stroke-pink stroke-black' />
						</button>

						{website && (
							<Link
								href={website}
								className='flex justify-center items-center bg-white p-2 md:p-3 lg:p-4 h-1/2 text-white rounded-full mb-1'
							>
								<DownloadIcon classes='w-5 h-5 fill-white dark:fill-black' />
							</Link>
						)}

						<button
							className='flex justify-center items-center bg-white p-2 md:p-3 lg:p-4 text-white rounded-full'
							onClick={() => dispatch(userSlice.actions.removeFavoriteGame(id))}
						>
							<GarbageIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button>
					</article>
				</section>
				<span className='p-1'>
					<TriplePointIcon classes='w-8 h-8' />
				</span>
			</article>
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
