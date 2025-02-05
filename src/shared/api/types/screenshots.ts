export interface Screenshot {
	image: string
	hidden: boolean
}

export interface ApiGameScreenshotListResponse {
	count: number
	next: string
	previous: string
	results: Screenshot[]
}
