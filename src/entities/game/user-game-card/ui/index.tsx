import Image from 'next/image'
import getRandomDefaultImage from '@/shared/model/defaultImages'
import { StoreLogoList } from '@/shared/model'
import { Store } from '@/shared/api/RawgApi-hook'
import Link from 'next/link'
import { DownloadIcon } from '@/shared/ui'
import { GarbageIcon } from '@/shared/ui/garbage-icon'

interface UsersGameCardProps {
	title: string
	releaseDate: string
	playtime: number
	website?: string
	stores?: Store[]
}

export function UsersGameCard({
	// title,
	// releaseDate,
	// playtime,
	website,
	stores,
}: UsersGameCardProps) {
	return (
		<article className='flex flex-row justify-between relative w-full h-1/3 p-3 rounded-xl mb-3 after:h-0.5 after:w-full after:absolute after:-bottom-1.5 after:bg-textGray'>
			<Image
				src={false || getRandomDefaultImage()}
				width={80}
				height={80}
				alt='Picture of the game'
				className=''
			/>
			<section className='flex flex-col justify-center text-white'>
				<h2 className='text-white mb-1 font-semibold'>Dota 2</h2>
				{/* <p className='flex flex-row text-textGray font-light'>Sandbox</p> */}
				<section className='flex flex-row justify-between'>
					<article className='flex flex-row text-white'>
						{stores ? <StoreLogoList stores={stores} /> : ''}
					</article>
				</section>
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
				<button className='bg-green text-white mb-1 font-semibold rounded-md py-1 px-3'>
					Complete
				</button>
				<article className='flex flex-row'>
					<button className='flex justify-center items-center bg-orangeBorder p-1 w-1/2 text-white font-semibold rounded-md mr-1'>
						<DownloadIcon />
					</button>

					<button className='flex justify-center items-center bg-accountExitRed p-1 w-1/2 text-white font-semibold rounded-md'>
						<GarbageIcon />
					</button>
				</article>
			</section>
		</article>
	)
}
//lg:flex-row  md:flex-col sm:flex-col
