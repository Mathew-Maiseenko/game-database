import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Games Details',
}

import dynamic from 'next/dynamic'
const GameDetailsPage = dynamic(() =>
	import('@/FSD_pages/game-details-page').then(file => file.GameDetailsPage)
)

export default function GameDetails() {
	return <GameDetailsPage />
}
