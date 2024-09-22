import { UsersGamesList } from '@/widgets/users-games-list'
import { UserMainInfo } from '@/widgets/user-main-info'

export default function UserPage() {
	return (
		<>
			<UserMainInfo />
			<UsersGamesList withButton={false} />
		</>
	)
}
