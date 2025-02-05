import {
	ApiGameScreenshotListResponse,
	Screenshot,
} from '../../types/screenshots'

const getListGameScreenshotsParams = (
	response: ApiGameScreenshotListResponse
) => response['results'].map((screenshots: Screenshot) => screenshots.image)

export default getListGameScreenshotsParams
