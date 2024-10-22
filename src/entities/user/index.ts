export { saveIsUserSignedInLocalStorage } from './lib/local-storage-functions/save-is-user-signed-in-local-storage'

export { saveAddingFavoriteGameInLocalStorage } from './lib/local-storage-functions/save-adding-favorite-game-in-local-storage'

export { saveSettingGameAchievementCompleteInLocalStorage } from './lib/local-storage-functions/save-setting-game-achievement-complete-in-local-storage'
export { saveSettingGameAchievementIncompleteInLocalStorage } from './lib/local-storage-functions/save-setting-game-achievement-incomplete-in-local-storage'

export { saveTogglingFavoriteGameСompletionInLocalStorage } from './lib/local-storage-functions/save-toggling-favorite-game-completion-in-local-storage'

export { saveRemovingFavoriteGameFromLocalStorage } from './lib/local-storage-functions/save-removing-favorite-game-from-local-storage'

export { saveUserInfoInLocalStorageAfterSigningUp } from './lib/local-storage-functions/save-user-in-local-storage'
export { UserButton } from './ui/user-button/ui'

export type { UserInfoLocaleStorageType, usersFavoriteGameType } from './types'

export { userSlice } from './model/user-slice'

export { UsersAvatar } from './ui/user-page-avatar'
export { GameStatistics } from './ui/user-game-statistics'
export { ComputerSpecifications } from './ui/user-computer-specifications'
export { UsersGameCard } from './ui/user-game-card'
export { UsersGamesList } from './ui/users-games-list'
export { calculateUsersFavoriteGenres } from './lib/calculate-users-favorite-genres'
export { calculateUsersRang } from './lib/calculate-users-rang'
