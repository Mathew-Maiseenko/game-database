import { UsersGameCard } from '../../../entities/game/user-game-card'

interface UsersGamesListProps {
	withButton: boolean
}

export async function UsersGamesList({ withButton }: UsersGamesListProps) {
	let hiddenClass: string = withButton ? '' : 'hidden'
	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pr-10 pt-5 rounded-3xl relative'>
			<h2 className='text-orange text-2xl  mb-8'>
				<strong className='inline text-white underline'>Your Gaming</strong>{' '}
				Library
			</h2>
			<section className='flex flex-col'>
				<UsersGameCard />
				<UsersGameCard />
				<UsersGameCard />
			</section>
			<button
				className={`${hiddenClass} bg-orange sm:w-1/2 md:w-1/3 m-auto p-2 relative bottom-[-20px] rounded-2xl text-white`}
			>
				View Your Library
			</button>
		</section>
	)
}
