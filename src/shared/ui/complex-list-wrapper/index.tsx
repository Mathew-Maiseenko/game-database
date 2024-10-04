import { ErrorMessage } from '../error-message'
import { Loader } from '../loader'

type fetchingState = 'idle' | 'pending' | 'fulfilled' | 'rejected'

interface ListWrapperProps {
	children: JSX.Element
	fetchingStates: fetchingState[]
}

export function ComplexHttpRequestWrapper({
	children,
	fetchingStates,
}: ListWrapperProps) {
	if (fetchingStates.some(fetchingState => fetchingState === 'pending')) {
		return (
			<section className='flex justify-center items-center w-full'>
				<Loader classes='w-1/2' />
			</section>
		)
	} else if (
		fetchingStates.some(fetchingState => fetchingState === 'rejected')
	) {
		return (
			<section className='flex justify-center items-center w-full'>
				<ErrorMessage classes='w-1/2' />
			</section>
		)
	} else if (
		fetchingStates.every(fetchingState => fetchingState === 'fulfilled')
	) {
		return children
	} else return
}
