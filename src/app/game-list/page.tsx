import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Games',
}

import dynamic from 'next/dynamic'
const GameListPage = dynamic(() =>
	import('@/FSD_pages/game-list-page').then(file => file.GameListPage)
)

export default function GameList() {
	return <GameListPage />
}
