import { MongoClient } from 'mongodb'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'
const genresDbName = 'Main'
const genresCollection = 'Genres'

interface Genre {
	id: number
	name: string
	slug: string
	gamesCount: number
	image: string
}

export async function GET() {
	const client = new MongoClient(mongoUrl)

	try {
		await client.connect()
		const db = client.db(genresDbName)
		const collection = db.collection(genresCollection)
		const data = await collection.find().toArray()

		return Response.json(data)
	} finally {
		await client.close()
	}
}

export async function POST(request: Request) {
	const client = new MongoClient(mongoUrl)

	try {
		await client.connect()
		const db = client.db(genresDbName)
		const collection = db.collection(genresCollection)

		const genre = (await request.json()) as Genre
		await collection.insertOne(genre)

		return Response.json({ message: 'Genre added successfully', genre })
	} finally {
		await client.close()
	}
}

export async function DELETE(request: Request) {
	const client = new MongoClient(mongoUrl)

	try {
		await client.connect()
		const db = client.db(genresDbName)
		const collection = db.collection(genresCollection)

		const { id } = (await request.json()) as { id: number }
		await collection.deleteOne({ id })

		return Response.json({ message: 'Genre deleted successfully', id })
	} finally {
		await client.close()
	}
}
