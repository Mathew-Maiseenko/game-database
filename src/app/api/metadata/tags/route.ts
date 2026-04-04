import { MongoClient, ObjectId } from 'mongodb'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'

interface Tag {
	id: number
	name: string
	slug: string
	image: string
	language: string
}

export async function GET() {
	const client = new MongoClient(mongoUrl)

	try {
		await client.connect()
		const db = client.db('Main')
		const collection = db.collection('Tags')
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
		const db = client.db('Tags')
		const collection = db.collection('tags-list')

		const tag = (await request.json()) as Tag
		await collection.insertOne(tag)

		return Response.json({ message: 'Tag added successfully', tag })
	} finally {
		await client.close()
	}
}

export async function DELETE(request: Request) {
	const client = new MongoClient(mongoUrl)

	try {
		await client.connect()
		const db = client.db('Tags')
		const collection = db.collection('tags-list')

		const { id } = (await request.json()) as { id: number }
		await collection.deleteOne({ id })

		return Response.json({ message: 'Tag deleted successfully', id })
	} finally {
		await client.close()
	}
}
