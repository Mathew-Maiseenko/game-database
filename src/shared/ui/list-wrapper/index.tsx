import { ErrorMessage } from '../error-message'
import { Loader } from '../loader'

interface ListWrapperProps {
	children: JSX.Element
	fetchingState: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export function ListWrapper({ children, fetchingState }: ListWrapperProps) {
	if (fetchingState === 'pending') {
		return (
			<section className='flex justify-center items-center w-full'>
				<Loader classes='w-1/2' />
			</section>
		)
	} else if (fetchingState === 'rejected') {
		return (
			<section className='flex justify-center items-center w-full'>
				<ErrorMessage classes='w-1/2' />
			</section>
		)
	} else if (fetchingState === 'fulfilled') {
		return children
	} else return
}
