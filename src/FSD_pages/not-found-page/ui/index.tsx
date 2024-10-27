import { ErrorPageWrapper } from '@/widgets/error-pages-wrapper'

export function NotFoundPage() {
	return (
		<ErrorPageWrapper>
			<h1 className='font-extrabold dark:text-darkThemeTextGray text-lightThemeTextDarkGray text-center xl:text-5xl pt-5 md:pl-5 md:pr-5 lg:text-4xl text-3xl'>
				Error 404
			</h1>
			<h2 className='font-extrabold dark:text-darkThemeTextGray text-lightThemeTextDarkGray text-center xl:text-5xl pt-5 md:pl-5 md:pr-5 lg:text-3xl text-2xl'>
				Oops! Something went wrong!
			</h2>
		</ErrorPageWrapper>
	)
}
