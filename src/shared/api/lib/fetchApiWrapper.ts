import { baseSiteUrl } from '@/shared/model'

export async function fetchApiWrapper<T>(endpoint: string): Promise<T> {
	return (await fetch(`${baseSiteUrl}/api/${endpoint}`).then(res => {
		console.log(res)

		const a = res.json()
		console.log(a)

		return a
	})) as Promise<T>
}
