import { GameDetailsPage } from '@/pages/game-details-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Games Details',
}

export default function GameDetails() {
	return <GameDetailsPage />
}
