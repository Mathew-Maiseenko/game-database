import Image from 'next/image'
import { MinimalistCarousel } from '@/shared/ui'

export function ListOfGameScreenshots({
	screenshots,
}: {
	screenshots: string[]
}) {
	return (
		<section className='mb-5'>
			<MinimalistCarousel>
				{...ViewListOfGameScreenshots(screenshots)}
			</MinimalistCarousel>
		</section>
	)
}

export const ViewListOfGameScreenshots = (screenshots: string[]) =>
	screenshots.map((screenshot, i) => (
		<Image
			key={`screenshot-${i}`}
			src={screenshot}
			width={2560}
			height={1440}
			className='w-1/3 mr-3 rounded-lg'
			alt='first game photo'
		/>
	))
