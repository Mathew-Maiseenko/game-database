import { ErrorPageWrapper } from '@/widgets/error-pages-wrapper'

export function Error500Page() {
	return (
		<ErrorPageWrapper>
			<h1 className='font-extrabold dark:text-darkThemeTextGray text-lightThemeTextDarkGray text-center xl:text-5xl pt-2 md:pt-5 md:pl-5 md:pr-5 lg:text-4xl text-3xl'>
				Error 500
			</h1>
			<h2 className='font-extrabold dark:text-darkThemeTextGray text-lightThemeTextDarkGray text-center xl:text-5xl pt-2 md:pt-5 md:pl-5 md:pr-5 lg:text-3xl text-2xl'>
				Something wrong with server (RAWG API) <br /> Please return later
			</h2>
		</ErrorPageWrapper>
	)
}
