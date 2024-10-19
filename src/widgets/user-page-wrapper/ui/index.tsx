import { notFound } from 'next/navigation'
import { userSlice } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/redux/hooks'

export function UserPageWrapper({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)
	if (!isUserSigned) {
		return notFound()
	} else {
		return <>{children}</>
	}
}
