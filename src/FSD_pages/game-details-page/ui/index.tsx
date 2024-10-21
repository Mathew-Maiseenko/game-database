'use client'
import React from 'react'
import { GameDetailsMain } from '@/widgets/game-details-main'
import { SimilarGameList } from '@/entities/game/similar-game-list'

export function GameDetailsPage() {
	return (
		<>
			<GameDetailsMain />
			<SimilarGameList />
		</>
	)
}
