import { queryParamsType } from '../model'

export function buildUrlQueryParams(
	params: Record<string, queryParamsType | undefined> = {}
) {
	return Object.entries(params)
		.reduce((acc, [key, value]) => {
			return `${acc}${key}=${value}&`
		}, '?')
		.slice(0, -1)
}
