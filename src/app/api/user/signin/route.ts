import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import {
	ADMINS_IDS_TABLE_NAME,
	DB_NAME,
	USERS_BASIC_TABLE_NAME,
	USERS_GAMES_TABLE_NAME,
} from '../../config'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		const { name, password } = body

		// Validate required fields
		if (!name || !password) {
			return NextResponse.json(
				{ error: 'Name and password are required' },
				{ status: 400 },
			)
		}

		const client = new MongoClient(mongoUrl)
		await client.connect()

		try {
			const db = client.db(DB_NAME)
			const usersCollection = db.collection(USERS_BASIC_TABLE_NAME)
			const usersGamesCollection = db.collection(USERS_GAMES_TABLE_NAME)
			const adminsIdsCollection = db.collection(ADMINS_IDS_TABLE_NAME)

			// Find user by name
			const user = await usersCollection.findOne({
				userName: name,
			})

			if (!user) {
				return NextResponse.json({ error: 'User not found' }, { status: 404 })
			}

			// Check password
			if (user.userPassword !== password) {
				return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
			}

			// Get user games data
			const userGamesData = await usersGamesCollection.findOne({
				userId: user.userId,
			})

			const adminRecord = await adminsIdsCollection.findOne({
				userId: user.userId,
			})
			const isAdmin = Boolean(adminRecord)

			return NextResponse.json(
				{
					message: 'User signed in successfully',
					isAdmin,
					user: {
						userId: user.userId,
						userName: user.userName,
						CPU: user.CPU,
						GPU: user.GPU,
						RAM: user.RAM,
						graphicsMemory: user.graphicsMemory,
						games: userGamesData?.games || {},
						favoriteGamesIds: userGamesData?.favoriteGamesIds || [],
					},
				},
				{ status: 200 },
			)
		} finally {
			await client.close()
		}
	} catch (error) {
		console.error('Error signing in user:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
