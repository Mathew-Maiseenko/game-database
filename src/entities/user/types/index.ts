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
	completedAchievementIds: Record<number, boolean | undefined>
	game: StoreGameDetails
}

export interface usersStatisticsType {
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
	fetchingDetailsByGamesIdsState: 'idle' | 'pending' | 'fulfilled' | 'rejected'
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
		games: Record<GameId, Omit<usersFavoriteGameType, 'game'> | undefined>
		favoriteGamesIds: number[]
	}
	computerSpecifications: {
		CPU: string
		GPU: string
		RAM: number
		graphicsMemory: number
	}
}
