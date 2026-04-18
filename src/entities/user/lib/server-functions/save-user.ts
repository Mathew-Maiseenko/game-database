import { postApiWrapper } from '@/shared/api/lib/PostApiWrapper'

export async function saveUserInfoAfterSigningUp(
	name: string,
	password: string,
	CPU: string,
	GPU: string,
	graphicsMemory: number,
	RAM: number,
) {
	await postApiWrapper(
		'/api/user/signup',
		JSON.stringify({ name, password, CPU, GPU, graphicsMemory, RAM }),
	)
}
