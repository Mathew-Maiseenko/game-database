import Image from 'next/image'
import getRandomDefaultImage from '@/shared/model/defaultImages'

export async function UsersGameCard() {
	return (
		<article className='flex flex-row justify-between relative w-full h-1/3 p-3 rounded-xl mb-3 after:h-[2px] after:w-full after:absolute after:bottom-[-5px] after:bg-textGray'>
			<Image
				src={false || getRandomDefaultImage()}
				width={80}
				height={80}
				alt='Picture of the author'
				className=''
			/>
			<section className='flex flex-col justify-center text-white'>
				<h2 className='text-white mb-1 font-semibold'>Dota 2</h2>
				<p className='flex flex-row text-textGray font-light'>Sandbox</p>
			</section>
			<section className='flex flex-col justify-center'>
				<h2 className='text-white mb-1 font-semibold'>Date Added</h2>
				<p className='flex flex-row text-textGray font-light'>24/08/2036</p>
			</section>
			<section className='flex flex-col justify-center'>
				<h2 className='text-white mb-1 font-semibold'>Hours Played</h2>
				<p className='flex flex-row text-textGray font-light'>24/08/2036</p>
			</section>
			<section className='flex flex-col justify-center'>
				<h2 className='text-white mb-1 font-semibold'>Currently</h2>
				<p className='flex flex-row text-textGray font-light'>Downloaded</p>
			</section>
			<section className='flex flex-col justify-center'>
				<h2 className='text-white mb-1 font-semibold'>Currently</h2>
				<p className='flex flex-row text-textGray font-light'>Downloaded</p>
			</section>
		</article>
	)
}
//lg:flex-row  md:flex-col sm:flex-col
