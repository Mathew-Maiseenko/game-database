import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'
import {
	DB_NAME,
	USERS_BASIC_TABLE_NAME,
	USERS_GAMES_TABLE_NAME,
} from '../../config'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

export async function GET() {
	try {
		const client = new MongoClient(mongoUrl)
		await client.connect()

		try {
			const db = client.db(DB_NAME)
			const usersCollection = db.collection(USERS_BASIC_TABLE_NAME)
			const usersGamesCollection = db.collection(USERS_GAMES_TABLE_NAME)

			// Получаем всех пользователей
			const users = await usersCollection.find({}).toArray()

			// Получаем все записи игр пользователей
			const usersGames = await usersGamesCollection.find({}).toArray()

			// Создаём Map для быстрого доступа к играм по userId
			const gamesMap = new Map()
			usersGames.forEach(gameData => {
				gamesMap.set(gameData.userId, gameData)
			})

			// Формируем ответ в том же формате, что и в signin
			const allUsers = users.map(user => {
				const userGamesData = gamesMap.get(user.userId)
				return {
					userId: user.userId,
					userName: user.userName,
					CPU: user.CPU,
					GPU: user.GPU,
					RAM: user.RAM,
					graphicsMemory: user.graphicsMemory,
					games: userGamesData?.games || {},
					favoriteGamesIds: userGamesData?.favoriteGamesIds || [],
				}
			})

			return NextResponse.json(
				{
					users: allUsers,
					total: allUsers.length,
				},
				{ status: 200 },
			)
		} finally {
			await client.close()
		}
	} catch (error) {
		console.error('Error fetching all users:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
