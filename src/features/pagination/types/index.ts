export interface PaginationProps {
	styles?: string
	totalPageCount: number
}

export interface PaginationButtonProps {
	setPage: (page: number) => void
	page: number
	isCurrentPage?: boolean
}
