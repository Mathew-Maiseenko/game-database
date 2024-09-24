'use client'
import { useRouter } from 'next/navigation'
import { UsersGameCard } from '../user-game-card'
import { StoreGameDetails } from '@/shared/api/RawgApi-hook'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'
import { useEffect } from 'react'
import { fetchDetailsByGamesIds } from '../../model/thunk/fetch-game-details'

interface UsersGamesListProps {
	withButton: boolean
}

export function UsersGamesList({ withButton }: UsersGamesListProps) {
	const dispatch = useDispatch()
	const router = useRouter()
	const userGamesIds = useAppSelector(
		userSlice.selectors.selectFavoriteGamesIds
	)

	useEffect(() => {
		dispatch(fetchDetailsByGamesIds(userGamesIds))
	}, [userGamesIds, dispatch])

	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pr-10 py-5 rounded-3xl relative'>
			<h2 className='text-orange text-2xl  mb-5'>
				<strong className='inline text-white underline'>Your Gaming</strong>{' '}
				Library
			</h2>
			<section className='flex flex-col'>
				<ViewUsersGamesList gameList={[]} />
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

function ViewUsersGamesList({ gameList }: { gameList: StoreGameDetails[] }) {
	return gameList.map((game: StoreGameDetails) => (
		<UsersGameCard
			key={game.id}
			id={game.id}
			title={game.name}
			poster={game.backgroundImage}
			releaseDate={game.released}
			playtime={game.playtime}
			achievementsCount={game.achievementsCount}
			completedAchievementsCount={1}
			website={game.website}
			stores={game.stores}
		/>
	))
}
