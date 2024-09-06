import {
	MinimalistInput,
	MinimalistMultiSelect,
	MinimalistSelect,
} from '@/shared/ui'

export function GameFiltration() {
	return (
		<article className='flex justify-between flex-wrap w-full'>
			<MinimalistInput
				className='w-[22%] font-medium mb-16'
				message={'Input game title'}
			/>
			<MinimalistMultiSelect
				className='w-[22%] font-medium mb-16'
				message={'Select genres'}
				withSearch={false}
				options={['111', '222', '333']}
			/>
			<MinimalistMultiSelect
				className='w-[22%] font-medium mb-16'
				message={'Select tag'}
				withSearch={false}
				options={['111', '222', '333']}
			/>
			<MinimalistSelect
				className='w-[22%] font-medium'
				message={'Select developer'}
				options={['aweff', 'adfwadw']}
			/>
		</article>
	)
}
