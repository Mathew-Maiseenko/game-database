'use client'
import { Store } from '@/shared/api/RawgApi-hook'
import { AnimatedTickIcon, TriplePointIcon } from '@/shared/ui'
import { GarbageIcon } from '@/shared/ui/icon/garbage-icon'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { useRouter } from 'next/navigation'

export function UsersOpeningActionsMenuButton({ id }: { id: number }) {
	const dispatch = useAppDispatch()
	const router = useRouter()

	return (
		<article className='flex flex-col px-6 text-5xl font-bold'>
			<TriplePointIcon classes='w-8 h-8' />
			{/* <button
						onClick={() =>
							dispatch(userSlice.actions.toggleFavoriteGameComplete(id))
						}
              
						className='bg-green text-white mb-1 font-semibold rounded-md py-1 px-3'
					>
						Complete
					</button> */}

			{/* <button className='flex justify-center items-center bg-downloadGameButton py-1 px-3 h-1/2 text-white rounded-md mb-1'>
							<DownloadIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button> */}
			{/* <button
							className='flex justify-center items-center bg-gameDeleteRedLightTheme p-2 md:p-3 lg:p-4 text-white rounded-full'
							onClick={() => dispatch(userSlice.actions.removeFavoriteGame(id))}
						>
							<GarbageIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button> */}
		</article>
	)
}

interface HoverIconWithTextProps {
	title: string
	children: JSX.Element
}
export function HoverIconWithText({ title }: HoverIconWithTextProps) {
	return (
		<article className={`${classes.icon} ${classes.message}`}>
			<section className={`${classes.tooltip}`}>{title}</section>
			<span className='p-1'>
				<TriplePointIcon classes='w-8 h-8' />
			</span>
		</article>
	)
}
