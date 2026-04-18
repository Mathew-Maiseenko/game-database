import { postApiWrapper } from '@/shared/api/lib/post'

export async function saveUserInfoAfterSigningUp(
	name: string,
	password: string,
	CPU: string,
	GPU: string,
	graphicsMemory: number,
	RAM: number,
) {
	const response = await postApiWrapper(
		'user/register',
		JSON.stringify({ name, password, CPU, GPU, graphicsMemory, RAM }),
	)

	if (response && response.userId) {
		localStorage.setItem('userId', response.userId.toString())
		console.log('User ID saved:', response.userId)
	} else {
		console.error('Registration succeeded but no userId in response:', response)
	}
}
