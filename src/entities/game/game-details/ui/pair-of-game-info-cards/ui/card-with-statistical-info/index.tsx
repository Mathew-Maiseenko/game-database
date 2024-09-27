import Image from 'next/image'
import downloadIcon from './../../../../../../../../public/downloadIcon.svg'
//import star from './../../../../../../../../public/star.svg'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
// import { HoverIconWithText } from '@/shared/ui'

//import { gameDetailsSlice } from '@/entities/game/game-details/model'

export default function CardWithStatisticalInfo() {
	const currentGameId = useAppSelector(
		gameDetailsSlice.selectors.selectCurrentGameId
	)
	const currentGame = useAppSelector(state =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)
	if (!currentGame) {
		return
	}

	return (
		<section className='flex flex-row justify-between bg-whiteGray rounded-3xl w-1/2 p-7 '>
			<article className='flex flex-col justify-between items-center'>
				{/* <Image
					src={star}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/> */}
				<h4 className='text-lg font-bold text-white'>4.8</h4>
			</article>
			<article className='flex flex-col justify-between items-center'>
				<Image
					src={downloadIcon}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/>
				<h4 className='text-lg font-bold text-white'>2.3M</h4>
			</article>
			<article className='flex flex-col justify-between items-center'>
				<Image
					src={downloadIcon}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/>
				<h4 className='text-lg font-bold text-white'>3</h4>
			</article>
			<article className='flex flex-col justify-between items-center'>
				<Image
					src={downloadIcon}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/>
				<h4 className='text-lg font-bold text-white'>4</h4>
			</article>
		</section>
	)
}
