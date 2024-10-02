export interface PaginationProps {
	styles?: string
	totalPageCount: number
	currentPage: number
}

export interface PaginationButtonProps {
	setPage: (page: number) => void
	page: number
}
