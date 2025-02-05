import { RawgApiClient } from '@/shared/api'

export async function GET() {
	const service = RawgApiClient.getInstance()
	const res = (await service).metadata?.getTagsList()!
	const data = await res

	return Response.json({ data })
}
