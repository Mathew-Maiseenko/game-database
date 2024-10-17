'use client'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { PaginationProps } from '../types'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
import { useCallback } from 'react'
import { PaginationButton } from './pagination-button'

export const Pagination = ({ styles, totalPageCount }: PaginationProps) => {
	const dispatch = useAppDispatch()
	const currentPage = useAppSelector(
		filteredGamesSlice.selectors.selectActivePage
	)
	const buttonsArr: JSX.Element[] = []

	function addPaginationButton(page: number | '...') {
		if (page === '...') {
			buttonsArr.push(
				<button className='transition-all duration-300 py-1 px-3 md:py-3 md:px-4  lg:py-4 lg:px-5 mr-2 bg-blue dark:bg-orange text-center text-white rounded-md dark:hover:bg-paginationHover hover:bg-hoverBlue hover:text-black dark:active:bg-paginationActive active:bg-activeBlue active:text-black '>
					...
				</button>
			)
		} else if (page === currentPage) {
			buttonsArr.push(
				<PaginationButton
					setPage={handlePageButtonClick}
					page={page}
					isCurrentPage={true}
				/>
			)
		} else {
			buttonsArr.push(
				<PaginationButton setPage={handlePageButtonClick} page={page} />
			)
		}
	}

	const handlePageButtonClick = useCallback(
		(page: number) => {
			dispatch(filteredGamesSlice.actions.setActivePage(page))
		},
		[dispatch]
	)

	if (totalPageCount === 1) {
		return
	}

	for (let i = 0; i < totalPageCount && i < 3; i++) {
		if (i === 0 && currentPage - 2 === 1) {
			addPaginationButton(1)
		}
		if (totalPageCount === currentPage && currentPage - i - 2 > 1 && i === 0) {
			addPaginationButton(1)
			addPaginationButton('...')
		} else if (totalPageCount === currentPage && currentPage - i - 2 === 1) {
			addPaginationButton(totalPageCount)
		} else if (
			i === 0 &&
			totalPageCount !== currentPage &&
			currentPage - 2 > 1
		) {
			addPaginationButton(1)
			addPaginationButton('...')
		}
		if (currentPage === 1 && currentPage + i < totalPageCount) {
			addPaginationButton(currentPage + i)
		} else if (currentPage > 1 && currentPage + i - 1 < totalPageCount) {
			addPaginationButton(currentPage + i - 1)
		} else if (totalPageCount === currentPage) {
			if (i - 2 < 1 && currentPage - i - 2 > 1) {
				addPaginationButton(currentPage + i - 2)
			} else if (currentPage - i - 2 === 1) {
				addPaginationButton(1)
				break
			}
		}

		if (currentPage + i === totalPageCount) {
			addPaginationButton(totalPageCount)
			break
		}

		if (i == 2 && currentPage + i + 1 === totalPageCount) {
			addPaginationButton('...')
			addPaginationButton(totalPageCount)
			break
		} else if (i == 2 && currentPage + 3 < totalPageCount) {
			addPaginationButton('...')
			addPaginationButton(totalPageCount)
			break
		}
	}
	return <section className={`flex ${styles}`}>{...buttonsArr}</section>
}
