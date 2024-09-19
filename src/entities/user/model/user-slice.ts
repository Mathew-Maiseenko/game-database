import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'
import type {
	GameId,
	setUserDataPayloadType,
	UserInfoStateType,
	usersFavoriteGameType,
	validationMessagesType,
} from '../types'
import { calculateUsersFavoriteGenres } from '../lib/calculate-users-favorite-genres'
import { calculateUsersRang } from '../lib/calculate-users-rang'

const initialState: UserInfoStateType = {
	isUserSigned: false,
	isUserLoggingModalOpen: false,
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
		selectIsLoggingModalOpen: state => state.isUserLoggingModalOpen,
		selectUserName: state => state.userBasics.userName,
		selectUserPassword: state => state.userBasics.userPassword,
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

		setUserLoggingModalOpen: state => {
			state.isUserLoggingModalOpen = true
		},
		setUserLoggingModalClose: state => {
			state.isUserLoggingModalOpen = false
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
		},

		setFavoriteGameCompleted: (state, action: PayloadAction<GameId>) => {
			const curGame = state.statistics.favoriteGames[action.payload]
			if (curGame) {
				curGame.isComplete = true
			}
		},
		setFavoriteGameInCompleted: (state, action: PayloadAction<GameId>) => {
			const curGame = state.statistics.favoriteGames[action.payload]
			if (curGame) {
				curGame.isComplete = false
			}
		},

		setUsersData: (state, action: PayloadAction<setUserDataPayloadType>) => {
			state.userBasics.userName = action.payload.userName
			state.userBasics.userPassword = action.payload.userPassword
			state.computerSpecifications = {
				CPU: state.computerSpecifications.CPU,
				GPU: state.computerSpecifications.GPU,
				RAM: state.computerSpecifications.RAM,
				graphicsMemory: state.computerSpecifications.graphicsMemory,
			}
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
