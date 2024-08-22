/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: {
			fullUrl: true,
		},
	}, //https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.rawg.io',
				port: '',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
