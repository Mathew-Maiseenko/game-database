import { DB_NAME, USERS_GAMES_TABLE_NAME } from '@/app/api/config'
import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		const { userId, gameId, achievementId } = body

		if (!userId || gameId === undefined || achievementId === undefined) {
			return NextResponse.json(
				{ error: 'userId, gameId, and achievementId are required' },
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

			// Set achievement as complete
			const gameData = userGamesData.games[gameId]
			if (!gameData) {
				return NextResponse.json(
					{ error: 'Game not found in user games' },
					{ status: 404 },
				)
			}

			const updatedGames = {
				...userGamesData.games,
				[gameId]: {
					...gameData,
					completedAchievementIds: {
						...gameData.completedAchievementIds,
						[achievementId]: true,
					},
				},
			}

			await usersGamesCollection.updateOne(
				{ userId },
				{
					$set: {
						games: updatedGames,
					},
				},
			)

			return NextResponse.json(
				{ message: 'Achievement marked as complete successfully' },
				{ status: 200 },
			)
		} finally {
			await client.close()
		}
	} catch (error) {
		console.error('Error setting achievement complete:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
