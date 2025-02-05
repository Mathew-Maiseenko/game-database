import type { Genre, TagResult } from '@/shared/api'
import type { AppDispatch } from '@/shared/lib'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export type setGenreType = ActionCreatorWithPayload<
	{
		name: string
		param: TagResult | Genre | undefined
	},
	'gamesFilteredList/setActiveGenres'
>
export type setTagType = ActionCreatorWithPayload<
	{
		name: string
		param: TagResult | Genre | undefined
	},
	'gamesFilteredList/setActiveTags'
>

export type setParamFoo = setTagType | setGenreType

export interface ViewCardsProps {
	dispatch: AppDispatch
	filterParams: Genre[] | TagResult[]
	activeFiltrationParams:
		| Record<string, Genre | undefined>
		| Record<string, TagResult | undefined>
	setParam: setParamFoo
}
