interface PaginationButtonProps {
	setPage(page: number): void
	page: number
	isCurrentPage?: boolean
}

export const PaginationButton = ({
	setPage,
	page,
	isCurrentPage = false,
}: PaginationButtonProps) => {
	return (
		<li
			className={`transition-all duration-300 py-1 px-3 md:py-3 md:px-4  lg:py-4 lg:px-5 mr-2 bg-blue dark:bg-orange text-center text-white rounded-md dark:hover:bg-orangeHover hover:bg-hoverBlue hover:text-black dark:active:bg-orangeActive active:bg-activeBlue active:text-black ${
				isCurrentPage && 'bg-hoverBlue'
			}`}
			onClick={() => {
				if (!isCurrentPage) {
					setPage(page)
				}
			}}
		>
			<button className='w-full h-full'>{page}</button>
		</li>
	)
}
