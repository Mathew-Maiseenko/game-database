import type { AppDispatch } from '@/shared/lib'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface submitUserDataFooParams {
	dispatch: AppDispatch
	router: AppRouterInstance
	name: string
	password: string
	verifiedPassword: string
	CPU: string
	GPU: string
	graphicsMemory: number
	RAM: number
}
