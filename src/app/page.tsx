import { WelcomeMessage } from '@/widgets/welcome-message'
import { PopularGamesList } from '@/widgets/popular-game-list'
import { UsersGamesList } from '@/widgets/users-games-list'
//import { RawgApi } from '@/shared/api/RawgApi-hook'
//import fetchingWrapper from '@/shared/api/RawgApi-hook/lib/fetching-wrapper'
// RawgApi.getGamesListWithParams(
// 	8,
// 	1,
// 	'GTA',
// 	'shooter',
// 	'singleplayer'
// 	//`'2023-12-31.2024/09/02T17:50:43'
// )
// fetchingWrapper(
// 	`https://api.rawg.io/api/games?key=fd711517d11b45b0b5c432f288b02d33&page=1&page_size=8&search=GTA`
// ).then(res => {
// 	console.log('аааааааааааааааааааааааааааааа', res)
// })
// RawgApi.getGamesListWithParams(8, 1, '', '', '', null, '')
// RawgApi.getGamesListWithParams(
// 	8,
// 	1,
// 	'',
// 	'action,indie',
// 	'multiplayer',
// 	2000,
// 	''
// )
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
