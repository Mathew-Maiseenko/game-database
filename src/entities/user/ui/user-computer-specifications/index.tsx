'use client'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'

export function ComputerSpecifications() {
	const { CPU, GPU, RAM, graphicsMemory } = useAppSelector(
		userSlice.selectors.selectComputerSpecifications
	)
	return (
		<article className='flex flex-col text-white sm:mr-0 md:mr-2 sm:w-full md:w-1/3'>
			<h2 className='text-center inline-block w-full text-white font-medium sm:text-2xl xl:text-3xl mb-2 underline'>
				Характеристики компьютера:
			</h2>
			<article className='flex flex-col justify-between w-full h-full pb-5 sm:text-md md:text-lg'>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-1 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl md:mb-5 sm:mb-2'>
					<h3>Процессор:</h3>
					<h4>{CPU}</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-1 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl md:mb-5 sm:mb-2'>
					<h3>Видеокарта:</h3>
					<h4>{GPU}</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-1 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl md:mb-5 sm:mb-2'>
					<h3>Размер видеопамяти:</h3>
					<h4>{graphicsMemory}ГБ</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-1 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl'>
					<h3>ОЗУ:</h3>
					<h4>{RAM}ГБ</h4>
				</section>
			</article>
		</article>
	)
}
