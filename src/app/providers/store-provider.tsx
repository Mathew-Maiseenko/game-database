'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'
import type { AppStore } from '@/shared/lib'
import { UserInfoLocaleStorageType, userSlice } from '@/entities/user'
import { themeSwitcherSlice } from '@/features/theme-switcher'

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		storeRef.current = makeStore()

		let userInfoJSON = localStorage.getItem('UserInfo')
		if (userInfoJSON) {
			console.log(userInfoJSON)

			const initialsUsersParams = {
				user: JSON.parse(userInfoJSON) as UserInfoLocaleStorageType,
				isSigned: localStorage.getItem('isUserSigned'),
			}

			storeRef.current.dispatch(
				userSlice.actions.initCurrentUser(initialsUsersParams)
			)
		} else {
			console.log('error local storage')
		}

		const startedSiteColorTheme = localStorage.getItem('current-theme')
		storeRef.current.dispatch(
			themeSwitcherSlice.actions.initActiveTheme(startedSiteColorTheme)
		)
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}
