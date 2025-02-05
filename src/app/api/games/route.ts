import { RawgApiClient, StoreGame, StoreGamesFiltrationObj } from '@/shared/api'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const service = RawgApiClient.getInstance()

	const gamesPerPage = Number(searchParams.get('page_size'))
	const pageNumber = Number(searchParams.get('page'))
	const title = searchParams.get('search')
	const genres = searchParams.get('genres')
	const tags = searchParams.get('tags')
	const year = searchParams.get('dates')
	const developers = searchParams.get('developers')

	const isSearchParamsEmpty =
		gamesPerPage || pageNumber || title || genres || tags || year || developers

	let res: Promise<StoreGame[]> | Promise<StoreGamesFiltrationObj>

	if (isSearchParamsEmpty) {
		res = (await service).games?.getGamesList()!
	} else {
		res = (await service).games?.getGamesListWithParams({
			gamesPerPage,
			pageNumber,
			title,
			genres,
			tags,
			year,
			developers,
		})!
	}

	const data = await res

	return Response.json({ data })
}
