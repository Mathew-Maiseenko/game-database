'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'
import type { AppStore } from '@/shared/lib'
import { userSlice } from '@/entities/user'
import { themeSwitcherSlice } from '@/features/theme-switcher'

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		storeRef.current = makeStore()

		storeRef.current.dispatch(userSlice.actions.initCurrentUser())
		storeRef.current.dispatch(themeSwitcherSlice.actions.initActiveTheme())
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}
