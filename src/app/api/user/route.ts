import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import {
	DB_NAME,
	USERS_BASIC_TABLE_NAME,
	USERS_GAMES_TABLE_NAME,
} from '../config'
import { UserInfoLocaleStorageType } from '@/entities/user'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		if (!userId) {
			return NextResponse.json({ error: 'userId is required' }, { status: 400 })
		}

		const parsedUserId = parseInt(userId)
		if (isNaN(parsedUserId)) {
			return NextResponse.json(
				{ error: 'userId must be a valid number' },
				{ status: 400 },
			)
		}

		const client = new MongoClient(mongoUrl)
		await client.connect()

		try {
			const db = client.db(DB_NAME)
			const usersCollection = db.collection(USERS_BASIC_TABLE_NAME)
			const usersGamesCollection = db.collection(USERS_GAMES_TABLE_NAME)

			// Find user by userId
			const user = await usersCollection.findOne({
				userId: parsedUserId,
			})

			if (!user) {
				return NextResponse.json({ error: 'User not found' }, { status: 404 })
			}

			// Get user games data
			const userGamesData = await usersGamesCollection.findOne({
				userId: parsedUserId,
			})

			const res: UserInfoLocaleStorageType = {
				// userId: user.userId,
				userBasics: {
					userName: user.userName,
					userPassword: user.userName,
				},
				statistics: {
					games: userGamesData?.games || {},
					favoriteGamesIds: userGamesData?.favoriteGamesIds || [],
				},
				computerSpecifications: {
					CPU: user.CPU,
					GPU: user.GPU,
					RAM: user.RAM,
					graphicsMemory: user.graphicsMemory,
				},
			}

			return NextResponse.json(res, { status: 200 })
		} finally {
			await client.close()
		}
	} catch (error) {
		console.error('Error fetching user:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
