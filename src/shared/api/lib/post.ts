import { baseSiteUrl } from '@/shared/model'

export async function postApiWrapper(endpoint: string, body: any) {
	const response = await fetch(`${baseSiteUrl}/api/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	})

	if (!response.ok) {
		const errorText = await response.text()
		console.error('API error:', response.status, errorText)
		throw new Error(`HTTP error ${response.status}: ${errorText}`)
	}

	const data = await response.json()
	return data
}
