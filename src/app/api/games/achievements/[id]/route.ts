import { RawgApiClient } from '@/shared/api'

export async function GET(_: Request, { params }: { params: { id: string } }) {
	const gameId = Number(params.id)
	const service = RawgApiClient.getInstance()
	const res = (await service).games?.getListGameAchievements(gameId)!
	const data = await res

	return Response.json(data)
}
