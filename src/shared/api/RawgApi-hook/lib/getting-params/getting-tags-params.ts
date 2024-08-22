import { ApiTagResponse, Tag } from '../../types/tag'

const getTagsListParams = (response: ApiTagResponse) =>
	response['results'].map((tag: Tag) => ({
		id: tag.id,
		name: tag.name,
		slug: tag.slug,
		image: tag['image_background'],
		language: tag.language,
	}))

export default getTagsListParams
