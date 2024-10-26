import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'
import type {
	GameId,
	initCurrentUserActionPayloadType,
	setUserDataPayloadType,
	UserInfoStateType,
	usersFavoriteGameType,
	validationMessagesType,
} from '../types'

import { fetchDetailsByGamesIds } from './thunk/fetch-game-details'
import { StoreGameDetails } from '@/shared/api/RawgApi-hook'

const initialState: UserInfoStateType = {
	isUserSigned: false,
	isUserSignInModalOpen: false,
	isUserSignUpModalOpen: false,
	fetchingDetailsByGamesIdsState: 'idle',
	userBasics: {
		userName: '',
		userPassword: '',
	},
	statistics: {
		favoriteGames: {},
		favoriteGamesIds: [],
	},
	computerSpecifications: {
		CPU: '',
		GPU: '',
		RAM: 0,
		graphicsMemory: 0,
	},
	validationMessages: {
		userNameValidationMessage: '',
	},
}

export const userSlice = createAppSlice({
	name: 'userSlice',
	initialState,
	selectors: {
		selectIsUserSigned: state => state.isUserSigned,
		selectIsUserSignUpModalOpen: state => state.isUserSignUpModalOpen,
		selectIsUserSignInModalOpen: state => state.isUserSignInModalOpen,
		selectUserName: state => state.userBasics.userName,
		selectUserPassword: state => state.userBasics.userPassword,
		selectIsUserStatistics: state => state.statistics,
		selectComputerSpecifications: state => state.computerSpecifications,
		selectFavoriteGames: state => state.statistics.favoriteGames,
		selectFavoriteGamesIds: state => state.statistics.favoriteGamesIds,
		selectFavoriteGamesIdsCount: state =>
			state.statistics.favoriteGamesIds.length,
		selectFavoriteGameById: (state, id) => state.statistics.favoriteGames[id],
		selectIsGameFavoriteById: (state, id) =>
			!!state.statistics.favoriteGames[id],
		selectIsAchievementCompleteById: (state, GameId, AchievementId): boolean =>
			!!state.statistics.favoriteGames[GameId]?.completedAchievementIds[
				AchievementId
			],
		selectValidationMessages: state => state.validationMessages,
		selectFetchingDetailsByGamesIdsState: state =>
			state.fetchingDetailsByGamesIdsState,
		selectIsUserContainGameById: (state, id) =>
			state.statistics.favoriteGames[id],
	},
	reducers: {
		setUserUnsigned: state => {
			state.isUserSigned = false
			//saveIsUserSignedInLocalStorage(false) ///!!!
		},
		setUserSigned: state => {
			state.isUserSigned = true
			//saveIsUserSignedInLocalStorage(true)
		},

		setUserSignUpModalOpen: state => {
			state.isUserSignUpModalOpen = true
		},
		setUserSignUpModalClose: state => {
			state.isUserSignUpModalOpen = false
		},

		setUserSignInModalOpen: state => {
			state.isUserSignInModalOpen = true
		},
		setUserSignInModalClose: state => {
			state.isUserSignInModalOpen = false
		},

		initCurrentUser: (
			state,
			action: PayloadAction<initCurrentUserActionPayloadType>
		) => {
			// let userInfoJSON = localStorage.getItem('UserInfo')
			// if (userInfoJSON) {
			// 	const isSigned = localStorage.getItem('isUserSigned')
			// 	const user = JSON.parse(userInfoJSON) as UserInfoLocaleStorageType

			const user = action.payload.user
			const isSigned = action.payload.isSigned

			state.isUserSigned = !!isSigned
			state.computerSpecifications = {
				...user.computerSpecifications,
			}
			state.userBasics = {
				...user.userBasics,
			}
			state.statistics.favoriteGamesIds = user.statistics.favoriteGamesIds
			state.statistics.favoriteGames = {
				...user.statistics.favoriteGamesIds.reduce(
					(acc, id) => ({
						...acc,
						[id]: {
							isComplete: user.statistics.games[id]?.isComplete,
							completedAchievementIds:
								user.statistics.games[id]?.completedAchievementIds || [],
							game: {},
						},
					}),
					{}
				),
			}
		},

		addFavoriteGame: (state, action: PayloadAction<StoreGameDetails>) => {
			if (!state.statistics.favoriteGames[action.payload.id]) {
				state.statistics.favoriteGames = {
					...state.statistics.favoriteGames,
					[action.payload.id]: {
						isComplete: false,
						completedAchievementIds: {},
						game: action.payload,
					},
				}

				state.statistics.favoriteGamesIds = [
					...state.statistics.favoriteGamesIds,
					action.payload.id,
				]
				//saveUserInfoInLocalStorage(state) // saveAddingFavoriteGameInLocalStorage(gameId: number)
			}
		},

		removeFavoriteGame: (state, action: PayloadAction<GameId>) => {
			state.statistics.favoriteGames = {
				...state.statistics.favoriteGames,
				[action.payload]: undefined,
			}
			state.statistics.favoriteGamesIds =
				state.statistics.favoriteGamesIds.filter(id => id !== action.payload)

			//saveUserInfoInLocalStorage(state) //saveRemovingFavoriteGameFromLocalStorage(id)
		},

		removeAllFavoriteGames: state => {
			state.statistics.favoriteGames = {}
			state.statistics.favoriteGamesIds = []
			//saveUserInfoInLocalStorage(state) //delete removing
		},

		toggleFavoriteGameComplete: (state, action: PayloadAction<GameId>) => {
			const curGame = state.statistics.favoriteGames[action.payload]
			if (curGame) {
				curGame.isComplete = !curGame.isComplete
			}
			//saveUserInfoInLocalStorage(state) //saveTogglingFavoriteGameСompletionInLocalStorage(id)
		},

		setAchievementCompleted: (
			state,
			action: PayloadAction<{ GameId: GameId; AchievementId: number }>
		) => {
			const game = state.statistics.favoriteGames[action.payload.GameId]
			if (game) {
				game.completedAchievementIds[action.payload.AchievementId] = true
				//saveUserInfoInLocalStorage(state) //saveSettingGameAchievementCompleteInLocalStorage
			}
		},

		setAchievementInCompleted: (
			state,
			action: PayloadAction<{ GameId: GameId; AchievementId: number }>
		) => {
			const game = state.statistics.favoriteGames[action.payload.GameId]
			if (game) {
				game.completedAchievementIds[action.payload.AchievementId] = undefined
				//saveUserInfoInLocalStorage(state) //saveSettingGameAchievementInCompleteInLocalStorage
			}
		},

		setUsersData: (state, action: PayloadAction<setUserDataPayloadType>) => {
			state.isUserSigned = true
			//saveIsUserSignedInLocalStorage(true)
			state.userBasics.userName = action.payload.userName
			state.userBasics.userPassword = action.payload.userPassword
			state.computerSpecifications = {
				CPU: action.payload.computerSpecifications.CPU,
				GPU: action.payload.computerSpecifications.GPU,
				RAM: action.payload.computerSpecifications.RAM,
				graphicsMemory: action.payload.computerSpecifications.graphicsMemory,
			}
			state.validationMessages = {
				userNameValidationMessage: '',
			}
			// saveUserInfoInLocalStorage(state) //saveUserInfoInLocalStorageAfterSigningUp
		},

		setValidationMessages: (
			state,
			action: PayloadAction<validationMessagesType>
		) => {
			state.validationMessages = {
				userNameValidationMessage: action.payload.userNameValidationMessage,
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchDetailsByGamesIds.pending, state => {
				state.fetchingDetailsByGamesIdsState = 'pending'
			})
			.addCase(fetchDetailsByGamesIds.fulfilled, (state, action) => {
				state.statistics.favoriteGames =
					state.statistics.favoriteGamesIds.reduce((acc, id) => {
						if (state.statistics.favoriteGames[id]) {
							return {
								...acc,
								[id]: {
									...state.statistics.favoriteGames[id],
									game: action.payload[id],
								},
							}
						} else {
							return {
								...acc,
								[id]: {
									isComplete: false,
									completedAchievementIds: {},
									game: action.payload[id],
								},
							}
						}
					}, {} as Record<number, usersFavoriteGameType | undefined>)

				state.fetchingDetailsByGamesIdsState = 'fulfilled'
			})
			.addCase(fetchDetailsByGamesIds.rejected, state => {
				state.fetchingDetailsByGamesIdsState = 'rejected'
			})
	},
})
