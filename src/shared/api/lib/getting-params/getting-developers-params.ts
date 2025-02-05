import { ApiDeveloperResponse, Developer } from '../../types/developer'

const getDevelopersListParams = (response: ApiDeveloperResponse) =>
	response['results'].map((developer: Developer) => ({
		id: developer.id,
		name: developer.name,
		slug: developer.slug,
		image: developer['image_background'],
		gameCount: developer['games_count'],
	}))

export default getDevelopersListParams
