export async function saveUserInfoAfterSigningUp(
	name: string,
	password: string,
	CPU: string,
	GPU: string,
	graphicsMemory: number,
	RAM: number
) {
	const response = await fetch('/api/user/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, password, CPU, GPU, graphicsMemory, RAM }),
	})

	if (!response.ok) {
		console.error('Failed to sign up user')
	}
}
