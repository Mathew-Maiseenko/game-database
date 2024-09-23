'use client'
import { useRouter } from 'next/navigation'
import { UsersGameCard } from '../../../entities/game/user-game-card'

interface UsersGamesListProps {
	withButton: boolean
}

export function UsersGamesList({ withButton }: UsersGamesListProps) {
	const router = useRouter()
	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pr-10 py-5 rounded-3xl relative'>
			<h2 className='text-orange text-2xl  mb-5'>
				<strong className='inline text-white underline'>Your Gaming</strong>{' '}
				Library
			</h2>
			<section className='flex flex-col'>
				<UsersGameCard />
				<UsersGameCard />
				<UsersGameCard />
			</section>
			<button
				className={`${
					withButton ? '' : 'hidden'
				} bg-orange sm:w-1/2 md:w-1/3 m-auto p-2 relative -bottom-5 rounded-2xl text-white`}
				onClick={() => {
					router.push('http://localhost:3000/user')
				}}
			>
				View Your Library
			</button>
		</section>
	)
}
