import { WelcomeMessage } from '@/widgets/welcome-message'
import { PopularGamesList } from '@/widgets/popular-game-list'
import { UsersGamesList } from '@/widgets/users-games-list'
// import { RawgApi } from '@/shared/api/RawgApi-hook'
// RawgApi.getGamesList()
// RawgApi.getGenresList()
// RawgApi.getTagsList()
// RawgApi.getListGameAchievements(1030)
// RawgApi.getGameDetails(1030)
export default async function Home() {
	return (
		<>
			<WelcomeMessage />
			<PopularGamesList />
			<UsersGamesList withButton={true} />
		</>
	)
}
