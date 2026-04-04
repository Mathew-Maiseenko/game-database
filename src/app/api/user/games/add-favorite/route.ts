import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import {
	DB_NAME,
	USERS_GAMES_TABLE_NAME,
} from '../../../config'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		const { userId, gameId } = body

		// Validate required fields
		if (!userId || gameId === undefined) {
			return NextResponse.json(
				{ error: 'userId and gameId are required' },
				{ status: 400 },
			)
		}

		const client = new MongoClient(mongoUrl)
		await client.connect()

		try {
			const db = client.db(DB_NAME)
			const usersGamesCollection = db.collection(USERS_GAMES_TABLE_NAME)

			// Find user's games data
			const userGamesData = await usersGamesCollection.findOne({ userId })

			if (!userGamesData) {
				return NextResponse.json(
					{ error: 'User games data not found' },
					{ status: 404 },
				)
			}

			// Add game to games object and favoriteGamesIds array
			const updatedGames = {
				...userGamesData.games,
				[gameId]: { isComplete: false, completedAchievementIds: {} },
			}

			const updatedFavoriteGamesIds = [
				...userGamesData.favoriteGamesIds,
				gameId,
			]

			await usersGamesCollection.updateOne(
				{ userId },
				{
					$set: {
						games: updatedGames,
						favoriteGamesIds: updatedFavoriteGamesIds,
					},
				},
			)

			return NextResponse.json(
				{ message: 'Favorite game added successfully' },
				{ status: 200 },
			)
		} finally {
			await client.close()
		}
	} catch (error) {
		console.error('Error adding favorite game:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
