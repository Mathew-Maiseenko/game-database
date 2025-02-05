import { getServerSideEnv } from '@/shared/model/variables/get-server-side-env'
import { ApiClient, GamesService, MetadataService } from '../model'

const BASE_URL = process.env.RAWG_BASE_URL!
const API_KEY = process.env.RAWG_API_KEY!

export class RawgApiClient {
	private static instance: RawgApiClient
	private apiClient: ApiClient | null = null

	public games: GamesService | null = null
	public metadata: MetadataService | null = null

	private constructor() {}

	private async initialize() {
		const env = await getServerSideEnv()
		this.apiClient = new ApiClient(env.RAWG_Api_BASE_URL, env.RAWG_Api_KEY)
		this.games = new GamesService(this.apiClient)
		this.metadata = new MetadataService(this.apiClient)
	}

	public static async getInstance(): Promise<RawgApiClient> {
		if (!RawgApiClient.instance) {
			RawgApiClient.instance = new RawgApiClient()
			await RawgApiClient.instance.initialize()
		}
		return RawgApiClient.instance
	}
}

// export class RawgApiClient {
// 	private static instance: RawgApiClient
// 	private apiClient: ApiClient

// 	public games: GamesService
// 	public metadata: MetadataService

// 	private constructor() {
// 		this.apiClient = new ApiClient(BASE_URL, API_KEY)
// 		this.games = new GamesService(this.apiClient)
// 		this.metadata = new MetadataService(this.apiClient)
// 	}

// 	public static getInstance(): RawgApiClient {
// 		if (!RawgApiClient.instance) {
// 			RawgApiClient.instance = new RawgApiClient()
// 		}
// 		return RawgApiClient.instance
// 	}
// }
