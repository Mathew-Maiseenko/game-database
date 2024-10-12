import { ErrorMessage } from '../error-message'
import { Loader } from '../loader'

interface ListWrapperProps {
	children: JSX.Element
	fetchingState: 'idle' | 'pending' | 'fulfilled' | 'rejected'
	ErrorMessageStyles?: string
}

export function ListWrapper({
	children,
	fetchingState,
	ErrorMessageStyles,
}: ListWrapperProps) {
	if (fetchingState === 'pending') {
		return (
			<section className='flex justify-center items-center w-full bg-lightThemeGray dark:bg-darkGray rounded-3xl px-10 py-10'>
				<Loader classes='w-1/3' />
			</section>
		)
	} else if (fetchingState === 'rejected') {
		return (
			<section
				className={`flex flex-col justify-center items-center w-full dark:border-none border-2 border-lightThemeBorderGray bg-lightThemeGray dark:bg-darkGray px-10 py-40 rounded-3xl ${ErrorMessageStyles}`}
			>
				<ErrorMessage classes='w-1/3' />
			</section>
		)
	} else if (fetchingState === 'fulfilled') {
		return children
	} else return
}
