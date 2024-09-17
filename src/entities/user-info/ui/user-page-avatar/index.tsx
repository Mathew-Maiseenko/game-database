import getRandomDefaultImage from '@/shared/model/defaultImages'

import Image from 'next/image'

export async function UsersAvatar() {
	return (
		<article className='flex flex-col sm:mr-0 md:mr-5 lg:mr-10 sm:w-full md:w-1/3 rounded-3xl relative after:h-full after:w-[1px] after:absolute md:after:-right-2 lg:after:-right-5  sm:after:bg-none md:after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-white font-bold sm:text-xl md:text-3xl mb-2 underline'>
				Alan Smithee
			</h2>
			<Image
				src={false || getRandomDefaultImage()}
				width={80}
				height={80}
				alt='user avatar'
				className='flex flex-grow sm:w-1/2 md:w-full rounded-3xl self-center'
			/>
		</article>
	)
}
