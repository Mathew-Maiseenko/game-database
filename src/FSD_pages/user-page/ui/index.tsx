'use client'
import { UsersGamesList } from '@/entities/user'
import { UserMainInfo } from '@/widgets/user-main-info'
import { UserPageWrapper } from '@/widgets/user-page-wrapper'

export function UserPage() {
	return (
		<UserPageWrapper>
			<UserMainInfo />
			<UsersGamesList withButton={false} />
		</UserPageWrapper>
	)
}
