import { RawgApiClient } from '@/shared/api'

export async function GET() {
	const service = RawgApiClient.getInstance()
	const res = (await service).games?.getRandomGamesPosters()!
	const data = await res

	return Response.json({ data })
}
