'use client'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { PaginationProps } from './types'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
import { useCallback } from 'react'
import { PaginationButton } from './ui/pagination-button'

export const Pagination = ({
	styles,
	totalPageCount,
	currentPage,
}: PaginationProps) => {
	const dispatch = useAppDispatch()
	const buttonsArr = []
	console.log(totalPageCount, currentPage)

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
			buttonsArr.push(
				<PaginationButton setPage={handlePageButtonClick} page={1} />
			)
		}
		if (totalPageCount === currentPage && currentPage - i - 2 > 1 && i === 0) {
			buttonsArr.push(
				<PaginationButton setPage={handlePageButtonClick} page={1} />
			)
			buttonsArr.push(
				<button className='p-3 bg-orange text-center text-white mr-2'>
					...
				</button>
			)
		} else if (totalPageCount === currentPage && currentPage - i - 2 === 1) {
			buttonsArr.push(
				<PaginationButton
					setPage={handlePageButtonClick}
					page={totalPageCount}
				/>
			)
		} else if (
			i === 0 &&
			totalPageCount !== currentPage &&
			currentPage - 2 > 1
		) {
			buttonsArr.push(
				<PaginationButton setPage={handlePageButtonClick} page={1} />
			)
			buttonsArr.push(
				<button className='p-3 bg-orange text-center text-white mr-2'>
					...
				</button>
			)
		}
		if (currentPage === 1 && currentPage + i < totalPageCount) {
			buttonsArr.push(
				<PaginationButton
					setPage={handlePageButtonClick}
					page={currentPage + i}
				/>
			)
		} else if (currentPage > 1 && currentPage + i - 1 < totalPageCount) {
			buttonsArr.push(
				<PaginationButton
					setPage={handlePageButtonClick}
					page={currentPage + i - 1}
				/>
			)
		} else if (totalPageCount === currentPage) {
			if (i - 2 < 1 && currentPage - i - 2 > 1) {
				buttonsArr.push(
					<PaginationButton
						setPage={handlePageButtonClick}
						page={currentPage + i - 2}
					/>
				)
			} else if (currentPage - i - 2 === 1) {
				buttonsArr.push(
					<PaginationButton
						setPage={handlePageButtonClick}
						page={currentPage + i - 2}
					/>
				)
				break
			}
		}

		if (currentPage + i === totalPageCount) {
			buttonsArr.push(
				<PaginationButton
					setPage={handlePageButtonClick}
					page={totalPageCount}
				/>
			)
			break
		}

		if (i == 2 && currentPage + i + 1 === totalPageCount) {
			buttonsArr.push(
				<button className='p-3 bg-orange text-center text-white mr-2'>
					...
				</button>
			)
			buttonsArr.push(
				<PaginationButton
					setPage={handlePageButtonClick}
					page={totalPageCount}
				/>
			)
			break
		} else if (i == 2 && currentPage + 3 < totalPageCount) {
			buttonsArr.push(
				<button className='p-3 bg-orange text-center text-white mr-2'>
					...
				</button>
			)
			buttonsArr.push(
				<PaginationButton
					setPage={handlePageButtonClick}
					page={totalPageCount}
				/>
			)
			break
		}
	}
	return <section className={`flex ${styles}`}>{...buttonsArr}</section>
}
