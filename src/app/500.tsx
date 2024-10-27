import dynamic from 'next/dynamic'
const Error500Page = dynamic(() =>
	import('@/FSD_pages/error-500-page').then(file => file.Error500Page)
)

import { Metadata } from 'next'
export const metadata: Metadata = {
	title: '500',
}

export default function Custom500ErrorPage() {
	return <Error500Page />
}
