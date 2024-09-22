import type { AppDispatch } from '@/shared/lib'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface signInUserParams {
	dispatch: AppDispatch
	router: AppRouterInstance
	name: string
	password: string
}
