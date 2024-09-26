import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'
import type {
	GameId,
	setUserDataPayloadType,
	UserInfoLocaleStorageType,
	UserInfoStateType,
	usersFavoriteGameType,
	validationMessagesType,
} from '../types'
import { calculateUsersFavoriteGenres } from '../lib/calculate-users-favorite-genres'
import { calculateUsersRang } from '../lib/calculate-users-rang'
import {
	saveIsUserSignedInLocalStorage,
	saveUserInfoInLocalStorage,
} from '../lib/saveUserInLocalStorage'
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
		userRang: '',
		favoriteGenres: [],
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
		passwordValidationMessage: '',
		CPUValidationMessage: '',
		GPUValidationMessage: '',
		RAMValidationMessage: '',
		graphicsMemoryValidationMessage: '',
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
		selectFavoriteGenres: state => state.statistics.favoriteGenres,
		selectFavoriteGames: state => state.statistics.favoriteGames,
		selectFavoriteGamesIds: state => state.statistics.favoriteGamesIds,
		selectFavoriteGameById: (state, id) => state.statistics.favoriteGames[id],
		selectValidationMessages: state => state.validationMessages,
		selectFetchingDetailsByGamesIdsState: state =>
			state.fetchingDetailsByGamesIdsState,
	},
	reducers: {
		setUserUnsigned: state => {
			state.isUserSigned = false
			saveIsUserSignedInLocalStorage(false)
		},
		setUserSigned: state => {
			state.isUserSigned = true
			saveIsUserSignedInLocalStorage(true)
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

		initCurrentUser: state => {
			let userInfoJSON = localStorage.getItem('UserInfo')
			if (userInfoJSON) {
				const isSigned = localStorage.getItem('isUserSigned')
				const user = JSON.parse(userInfoJSON) as UserInfoLocaleStorageType

				state.isUserSigned = !!isSigned
				state.computerSpecifications = {
					...user.computerSpecifications,
				}
				state.userBasics = {
					...user.userBasics,
				}
				state.statistics.favoriteGamesIds = [
					...user.statistics.favoriteGamesIds,
				]
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
			}
		},

		addFavoriteGame: (state, action: PayloadAction<StoreGameDetails>) => {
			if (!state.statistics.favoriteGames[action.payload.id]) {
				state.statistics = {
					...state.statistics,
					userRang: calculateUsersRang(
						state.statistics.favoriteGamesIds.length
					),
					favoriteGenres: calculateUsersFavoriteGenres(state),
					favoriteGames: {
						...state.statistics.favoriteGames,
						[action.payload.id]: {
							isComplete: false,
							completedAchievementIds: [],
							game: action.payload,
						},
					},
					favoriteGamesIds: [
						...state.statistics.favoriteGamesIds,
						action.payload.id,
					],
				}
				saveUserInfoInLocalStorage(state)
			}
		},
		removeFavoriteGame: (state, action: PayloadAction<GameId>) => {
			state.statistics = {
				userRang: calculateUsersRang(state.statistics.favoriteGamesIds.length),
				favoriteGenres: calculateUsersFavoriteGenres(state),
				favoriteGames: {
					...state.statistics.favoriteGames,
					[action.payload]: undefined,
				},
				favoriteGamesIds: state.statistics.favoriteGamesIds.filter(
					id => id !== action.payload
				),
			}
			saveUserInfoInLocalStorage(state)
		},

		setFavoriteGameCompleted: (state, action: PayloadAction<GameId>) => {
			const curGame = state.statistics.favoriteGames[action.payload]
			if (curGame) {
				curGame.isComplete = true
			}
			saveUserInfoInLocalStorage(state)
		},
		setFavoriteGameInCompleted: (state, action: PayloadAction<GameId>) => {
			const curGame = state.statistics.favoriteGames[action.payload]
			if (curGame) {
				curGame.isComplete = false
			}
			saveUserInfoInLocalStorage(state)
		},
		toggleFavoriteGameComplete: (state, action: PayloadAction<GameId>) => {
			const curGame = state.statistics.favoriteGames[action.payload]
			if (curGame) {
				curGame.isComplete = !curGame.isComplete
			}
			saveUserInfoInLocalStorage(state)
		},

		setAchievementCompleted: (
			state,
			action: PayloadAction<{ GameId: GameId; AchievementId: number }>
		) => {
			state.statistics.favoriteGames[
				action.payload.GameId
			]?.completedAchievementIds.push(action.payload.AchievementId)
		},

		setAchievementInCompleted: (
			state,
			action: PayloadAction<{ GameId: GameId; AchievementId: number }>
		) => {
			state.statistics.favoriteGames[
				action.payload.GameId
			]?.completedAchievementIds.filter(
				id => id !== action.payload.AchievementId
			)
		},

		setUsersData: (state, action: PayloadAction<setUserDataPayloadType>) => {
			state.isUserSigned = true
			saveIsUserSignedInLocalStorage(true)
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
				passwordValidationMessage: '',
				CPUValidationMessage: '',
				GPUValidationMessage: '',
				RAMValidationMessage: '',
				graphicsMemoryValidationMessage: '',
			}
			saveUserInfoInLocalStorage(state)
		},

		setValidationMessages: (
			state,
			action: PayloadAction<validationMessagesType>
		) => {
			state.validationMessages = {
				userNameValidationMessage: action.payload.userNameValidationMessage,
				passwordValidationMessage: action.payload.passwordValidationMessage,
				CPUValidationMessage: action.payload.CPUValidationMessage,
				GPUValidationMessage: action.payload.GPUValidationMessage,
				RAMValidationMessage: action.payload.RAMValidationMessage,
				graphicsMemoryValidationMessage:
					action.payload.graphicsMemoryValidationMessage,
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
									completedAchievementIds: [],
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
