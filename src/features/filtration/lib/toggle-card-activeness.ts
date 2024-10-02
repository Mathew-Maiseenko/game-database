import type { TagResult } from '@/shared/api/RawgApi-hook'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { AppDispatch } from '@/shared/lib'
import type { setParamFoo } from '../types'

export function toggleCardActiveness(
	dispatch: AppDispatch,
	activeParamName: string,
	activeParam: Genre | TagResult | undefined,
	activeParamStore:
		| Record<string, Genre | undefined>
		| Record<string, TagResult | undefined>,
	activeParamDispatcher: setParamFoo
) {
	if (!activeParamStore[activeParamName] && activeParamName) {
		dispatch(
			activeParamDispatcher({ name: activeParamName, param: activeParam })
		)
	} else if (activeParamStore[activeParamName] && activeParamName) {
		dispatch(activeParamDispatcher({ name: activeParamName, param: undefined }))
	}
}
