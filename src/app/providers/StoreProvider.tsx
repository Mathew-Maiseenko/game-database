'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'
import type { AppStore } from '@/shared/lib'

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		// сюда можно  инициальзацию слайсов
		storeRef.current = makeStore()
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}
