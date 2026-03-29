import { MongoClient } from 'mongodb'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

export async function GET() {
	const client = new MongoClient(mongoUrl)

	try {
		await client.connect()
		const db = client.db('Tags')
		const collection = db.collection('tags-list')
		const data = await collection.find().toArray()

		return Response.json(data)
	} finally {
		await client.close()
	}
}
