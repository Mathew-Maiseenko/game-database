export default async function fetchingWrapper(url: string) {
	return await fetch(url).then(res => res.json())
}
