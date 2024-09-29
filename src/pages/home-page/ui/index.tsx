import { WelcomeMessage } from '@/widgets/welcome-message'
import { PopularGamesList } from '@/widgets/popular-game-list'
import { UsersGamesList } from '@/entities/user/ui/users-games-list'

export function HomePage() {
	return (
		<>
			<WelcomeMessage />
			<PopularGamesList />
			<UsersGamesList withButton={true} />
		</>
	)
}
