import { baseSiteUrl } from '@/shared/model'

export async function postApiWrapper(endpoint: string, body: any) {
	return await fetch(`${baseSiteUrl}/api/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	}).then(res => {
		console.log(res)

		const a = res.json()
		console.log(a)

		return a
	})
}
