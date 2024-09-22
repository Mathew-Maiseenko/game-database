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

const initialState: UserInfoStateType = {
	isUserSigned: false,
	isUserSignInModalOpen: false,
	isUserSignUpModalOpen: false,
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
	},
	reducers: {
		setUserUnsigned: state => {
			state.isUserSigned = false
		},
		setUserSigned: state => {
			state.isUserSigned = true
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
					...user.statistics.completedGamesIds.reduce(
						(acc, id) => ({
							...acc,
							[id]: {
								isComplete: true,
								game: {},
							},
						}),
						{}
					),
				}
			}
		},

		addFavoriteGame: (state, action: PayloadAction<usersFavoriteGameType>) => {
			state.statistics = {
				userRang: calculateUsersRang(state.statistics.favoriteGamesIds.length),
				favoriteGenres: calculateUsersFavoriteGenres(state),
				favoriteGames: {
					...state.statistics.favoriteGames,
					[action.payload.game.id]: {
						isComplete: false,
						game: action.payload.game,
					},
				},
				favoriteGamesIds: [
					...state.statistics.favoriteGamesIds,
					action.payload.game.id,
				],
			}
			saveUserInfoInLocalStorage(state)
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
})
