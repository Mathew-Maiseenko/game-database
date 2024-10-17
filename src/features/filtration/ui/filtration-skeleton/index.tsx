import { SkeletonRect } from '@/shared/ui'

export function FiltrationSkeleton() {
	const carouselCardsSkeletonsList = Array.from(
		{ length: 10 },
		(_, i: number) => (
			<SkeletonRect
				key={`Filtration-skeleton-rect-${i}`}
				styles='inline-block cursor-pointer mx-2 sm:mx-3 rounded-lg overflow-hidden w-1/3 sm:w-1/4
				md:w-1/5 lg:w-1/6 h-16 md:h-20'
			/>
		)
	)
	return (
		<section className='flex flex-col w-full'>
			<SkeletonRect styles='w-full h-0.5 mb-10 mt-6 md:mb-16 md:mt-10' />
			<section className='inline-block mb-3 whitespace-nowrap overflow-hidden'>
				{...carouselCardsSkeletonsList}
			</section>
			<section className='inline-block mb-10 md:mb-14 whitespace-nowrap overflow-hidden'>
				{...carouselCardsSkeletonsList}
			</section>
			<SkeletonRect styles='w-full h-0.5 md:mb-16 mb-10' />
		</section>
	)
}
