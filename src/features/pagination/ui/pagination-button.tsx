import type { PaginationButtonProps } from '../types'

export const PaginationButton = ({
	setPage,
	page,
	isCurrentPage = false,
}: PaginationButtonProps) => {
	return (
		<button
			className={`transition-all duration-300 py-2 px-4 mr-2 bg-blue dark:bg-orange text-center text-white rounded-md dark:hover:bg-orangeHover hover:bg-hoverBlue hover:text-black dark:active:bg-orangeActive active:bg-activeBlue active:text-black ${
				isCurrentPage && 'bg-activeBlue'
			}`}
			onClick={() => {
				if (!isCurrentPage) {
					setPage(page)
				}
			}}
		>
			{page}
		</button>
	)
}
