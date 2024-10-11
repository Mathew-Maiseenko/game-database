import type { PaginationButtonProps } from '../types'

export const PaginationButton = ({ setPage, page }: PaginationButtonProps) => {
	return (
		<button
			className='transition-all duration-300 py-2 px-4 mr-2 bg-blue dark:bg-orange text-center text-white rounded-md dark:hover:bg-paginationHover hover:bg-hoverBlue hover:text-black dark:active:bg-paginationActive active:bg-activeBlue active:text-black '
			onClick={() => setPage(page)}
		>
			{page}
		</button>
	)
}
