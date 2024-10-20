import { GameListPage } from '@/pages/game-list-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Games',
}

export default function GameList() {
	return <GameListPage />
}
