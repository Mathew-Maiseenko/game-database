'use server'
import z from 'zod'

const serverSideEnvDotSchema = z.object({
	RAWG_Api_KEY: z.string().nonempty(),
	RAWG_Api_BASE_URL: z.string().nonempty(),
})

export async function getServerSideEnv() {
	return serverSideEnvDotSchema.parse({
		RAWG_Api_KEY: process.env.RAWG_Api_KEY,
		RAWG_Api_BASE_URL: process.env.RAWG_Api_BASE_URL,
	})
}
