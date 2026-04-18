import { MongoClient } from 'mongodb'

const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/'
const dbName = 'Main'
const collectionName = 'Developers'

interface Developer {
	id: number
	name: string
	slug: string
	image: string
	gameCount: number
}

// GET /api/developers — получить список всех разработчиков
export async function GET() {
	const client = new MongoClient(mongoUrl)

	try {
		await client.connect()
		const db = client.db(dbName)
		const collection = db.collection<Developer>(collectionName)
		const data = await collection.find().toArray()

		return Response.json(data)
	} catch (error) {
		console.error('Error fetching developers:', error)
		return new Response('Internal Server Error', { status: 500 })
	} finally {
		await client.close()
	}
}

// POST /api/developers — добавить нового разработчика
export async function POST(request: Request) {
	const client = new MongoClient(mongoUrl)

	try {
		const developer = (await request.json()) as Developer

		// Простейшая валидация обязательных полей
		if (!developer.id || !developer.name || !developer.slug) {
			return new Response('Missing required fields: id, name, slug', {
				status: 400,
			})
		}

		await client.connect()
		const db = client.db(dbName)
		const collection = db.collection<Developer>(collectionName)

		// Проверка на существование разработчика с таким id (опционально)
		const existing = await collection.findOne({ id: developer.id })
		if (existing) {
			return new Response('Developer with this id already exists', {
				status: 409,
			})
		}

		await collection.insertOne(developer)

		return Response.json({ message: 'Developer added successfully', developer })
	} catch (error) {
		console.error('Error adding developer:', error)
		return new Response('Internal Server Error', { status: 500 })
	} finally {
		await client.close()
	}
}

// DELETE /api/developers — удалить разработчика по id (передаётся в теле запроса)
export async function DELETE(request: Request) {
	const client = new MongoClient(mongoUrl)

	try {
		const { id } = (await request.json()) as { id: number }

		if (!id) {
			return new Response('Missing id field', { status: 400 })
		}

		await client.connect()
		const db = client.db(dbName)
		const collection = db.collection<Developer>(collectionName)

		const result = await collection.deleteOne({ id })

		if (result.deletedCount === 0) {
			return new Response('Developer not found', { status: 404 })
		}

		return Response.json({ message: 'Developer deleted successfully', id })
	} catch (error) {
		console.error('Error deleting developer:', error)
		return new Response('Internal Server Error', { status: 500 })
	} finally {
		await client.close()
	}
}
