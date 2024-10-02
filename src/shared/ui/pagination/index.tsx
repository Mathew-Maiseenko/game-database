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
			console.log('случай 1')
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

/*'use client'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { PaginationProps } from './types'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
import { useCallback } from 'react'

export const Pagination = ({
	styles,
	totalPageCount,
	currentPage,
}: PaginationProps) => {
	const dispatch = useAppDispatch()
	const buttonsArr = []
	console.log(totalPageCount, currentPage)

	const setCurrentPage = filteredGamesSlice.actions.setActivePage

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
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(1))}
				>
					1
				</button>
			)
		}
		if (totalPageCount === currentPage && currentPage - i - 2 > 1 && i === 0) {
			buttonsArr.push(
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(1))}
				>
					1
				</button>
			)
			buttonsArr.push(
				<button className='p-3 bg-orange text-center text-white mr-2'>
					...
				</button>
			)
		} else if (totalPageCount === currentPage && currentPage - i - 2 === 1) {
			buttonsArr.push(
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(totalPageCount))}
				>
					{totalPageCount}
				</button>
			)
		} else if (
			i === 0 &&
			totalPageCount !== currentPage &&
			currentPage - 2 > 1
		) {
			buttonsArr.push(
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(1))}
				>
					1
				</button>
			)
			buttonsArr.push(
				<button className='p-3 bg-orange text-center text-white mr-2'>
					...
				</button>
			)
		}
		if (currentPage === 1 && currentPage + i < totalPageCount) {
			buttonsArr.push(
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(currentPage + i))}
				>
					{currentPage + i}
				</button>
			)
		} else if (currentPage > 1 && currentPage + i - 1 < totalPageCount) {
			buttonsArr.push(
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(currentPage + i - 1))}
				>
					{currentPage + i - 1}
				</button>
			)
		} else if (totalPageCount === currentPage) {
			if (i - 2 < 1 && currentPage - i - 2 > 1) {
				buttonsArr.push(
					<button
						className='p-3 bg-orange text-center text-white mr-2'
						onClick={() => dispatch(setCurrentPage(currentPage - i - 2))}
					>
						{currentPage - i - 2}
					</button>
				)
			} else if (currentPage - i - 2 === 1) {
				buttonsArr.push(
					<button
						className='p-3 bg-orange text-center text-white mr-2'
						onClick={() => dispatch(setCurrentPage(currentPage - i - 2))}
					>
						{currentPage - i - 2}
					</button>
				)
				break
			}
		}
		if (currentPage + i === totalPageCount) {
			console.log('случай 1')

			buttonsArr.push(
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(totalPageCount))}
				>
					{totalPageCount}
				</button>
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
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(totalPageCount))}
				>
					{totalPageCount}
				</button>
			)
			break
		} else if (i == 2 && currentPage + 3 < totalPageCount) {
			buttonsArr.push(
				<button className='p-3 bg-orange text-center text-white mr-2'>
					...
				</button>
			)
			buttonsArr.push(
				<button
					className='p-3 bg-orange text-center text-white mr-2'
					onClick={() => dispatch(setCurrentPage(totalPageCount))}
				>
					{totalPageCount}
				</button>
			)
			break
		}
	}
	return <section className={`flex ${styles}`}>{...buttonsArr}</section>
}

*/
/*
	if (currentPage === 1 && totalPageCount > 4) {
		return (
			<section className={`${styles}`}>
				<button>1</button>
				<button>2</button>
				<button>3</button>
				<article>...</article>
				<button>{totalPageCount}</button>
			</section>
		)
	} else if (currentPage === 1 && totalPageCount === 4) {
		return (
			<section className={`${styles}`}>
				<button>1</button>
				<button>2</button>
				<button>3</button>
				<button>4</button>
			</section>
		)
	} else if (currentPage === 1 && totalPageCount < 4 && totalPageCount > 1) {
		const buttonsArr = []
		for (let i = 1; i <= totalPageCount; i++) {
			buttonsArr.push(<button>{i}</button>)
		}
		return <section className={`${styles}`}>{...buttonsArr}</section>
	}
	///////////////////////////////////////////////////////
	///////////////////////////////////////////
	///////////////////////////////////////////////
	if (currentPage === 1 && totalPageCount < 4 && totalPageCount > 1) {
*/
