'use client'
import React from 'react'
import { GameDetailsMain } from '@/widgets/game-details-main'
import { RecommendedGameList } from '@/entities/game/recommended-game-list'

export function GameDetailsPage() {
	return (
		<>
			<GameDetailsMain />
			<RecommendedGameList />
		</>
	)
}
