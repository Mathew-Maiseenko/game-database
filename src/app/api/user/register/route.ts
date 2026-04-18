import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import {
	DB_NAME,
	USERS_BASIC_TABLE_NAME,
	USERS_GAMES_TABLE_NAME,
} from '../../config'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		const { name, password, CPU, GPU, graphicsMemory, RAM } = body

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

			// Check if user already exists
			const existingUser = await usersCollection.findOne({
				userName: name,
			})
			if (existingUser) {
				return NextResponse.json(
					{ error: 'User with this name already exists' },
					{ status: 409 },
				)
			}

			const newId = String(Date.now())

			const newUserData = {
				userId: newId,
				userName: name,
				userPassword: password,
				CPU: CPU || '',
				GPU: GPU || '',
				RAM: RAM || 0,
				graphicsMemory: graphicsMemory || 0,
				createdAt: new Date().toString(),
			}

			const newUserGameInitialData = {
				userId: newId,
				createdAt: new Date().toString(),
				games: {},
				favoriteGamesIds: [],
			}

			await usersGamesCollection.insertOne(newUserGameInitialData)

			await usersCollection.insertOne(newUserData)

			return NextResponse.json(
				{
					message: 'User created successfully',
					userId: newId,
				},
				{ status: 201 },
			)
		} finally {
			await client.close()
		}
	} catch (error) {
		console.error('Error creating user:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		)
	}
}
