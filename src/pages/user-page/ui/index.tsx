import { UsersGamesList } from '@/entities/user'
import { UserMainInfo } from '@/widgets/user-main-info'

export function UserPage() {
	return (
		<>
			<UserMainInfo />
			<UsersGamesList withButton={false} />
		</>
	)
}
