import type { PaginationButtonProps } from '../types'

export const PaginationButton = ({ setPage, page }: PaginationButtonProps) => {
	return (
		<button
			className='border-2 transition-all duration-300 border-orange p-2 bg-orange text-center text-white rounded-md hover:bg-paginationHover hover:text-black active:bg-paginationActive active:text-black '
			onClick={() => setPage(page)}
		>
			{page}
		</button>
	)
}
;('w-1/2 rounded-3xl border-2 transition-all duration-300 border-orange p-1 text-orange hover:text-white hover:bg-orange active:bg-activeButtonRed active:text-white')
