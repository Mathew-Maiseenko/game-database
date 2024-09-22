import { StoreGameDetails } from '@/shared/api/RawgApi-hook'

export type GameId = number

export interface usersComputerSpecificationsType {
	CPU: string
	GPU: string
	RAM: number
	graphicsMemory: number
}

export interface usersFavoriteGameType {
	isComplete: boolean
	game: StoreGameDetails
}

export interface usersStatisticsType {
	userRang: string
	favoriteGenres: string[]
	favoriteGames: Record<GameId, usersFavoriteGameType | undefined>
	favoriteGamesIds: GameId[]
}

export interface setUserDataPayloadType {
	userName: string
	userPassword: string
	computerSpecifications: usersComputerSpecificationsType
}

export interface validationMessagesType {
	userNameValidationMessage: string
	passwordValidationMessage: string
	CPUValidationMessage: string
	GPUValidationMessage: string
	RAMValidationMessage: string
	graphicsMemoryValidationMessage: string
}

export interface UserInfoStateType {
	isUserSigned: boolean
	isUserSignInModalOpen: boolean
	isUserSignUpModalOpen: boolean
	userBasics: {
		userName: string
		userPassword: string
	}
	statistics: usersStatisticsType
	computerSpecifications: usersComputerSpecificationsType
	validationMessages: validationMessagesType
}

export interface UserInfoLocaleStorageType {
	userBasics: {
		userName: string
		userPassword: string
	}
	statistics: {
		completedGamesIds: number[]
		favoriteGamesIds: number[]
	}
	computerSpecifications: {
		CPU: string
		GPU: string
		RAM: number
		graphicsMemory: number
	}
}
