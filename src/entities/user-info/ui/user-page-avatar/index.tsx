import getRandomDefaultImage from '@/shared/model/defaultImages'

import Image from 'next/image'

export async function UsersAvatar() {
	return (
		<article className='flex flex-col w-1/3 rounded-3xl relative after:h-full after:w-[1px] after:absolute after:right-[-18px]  after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-white font-bold text-3xl mb-2 underline'>
				Alan Smithee
			</h2>
			<Image
				src={false || getRandomDefaultImage()}
				width={80}
				height={80}
				alt='user avatar'
				className='flex flex-grow w-full rounded-3xl'
			/>
		</article>
	)
}
