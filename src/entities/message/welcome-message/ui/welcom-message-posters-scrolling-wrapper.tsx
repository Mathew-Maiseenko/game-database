import { RawgApi } from '@/shared/api/RawgApi-hook'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '../../../../../public/logo.png'

export function WelcomeMessagePostersScrollingWrapper({
	children,
}: {
	children: JSX.Element
}) {
	const [gamesPosters, setGamesPosters] = useState<string[]>([])
	const [curPosterNumber, setCurPosterNumber] = useState<number>(0)

	useEffect(() => {
		RawgApi.getRandomGamesPosters().then(setGamesPosters)
	}, [])

	setInterval(() => setCurPosterNumber(curPosterNumber + 1), 5000)

	return (
		<section className='relative inline-flex flex-col justify-between min-w-full min-h-[46vh] bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray mb-10 px-10 py-14 rounded-3xl overflow-hidden'>
			<Image
				className='absolute top-0 left-0 z-10 w-full h-full'
				src={logo}
				width={1080}
				height={720}
				alt='Empty poster'
			/>
			<article
				className={`transform absolute top-0 left-0 origin-top-right h-full z-20 ${'translate-x-full'}`}
			>
				<ViewPostersList posters={gamesPosters} />
			</article>
			{children}
		</section>
	)
}

function ViewPostersList({ posters }: { posters: string[] }) {
	return posters.map(poster => (
		<Image src={poster} width={1080} height={720} alt='Empty poster' />
	))
}

/*
function ViewPostersList({ posters }: { posters: string[] }) {
	return [
		<Image src={logo} width={1080} height={720} alt='Empty poster' />,
		...posters.map(poster => (
			<Image src={poster} width={1080} height={720} alt='Empty poster' />
		)),
	]
}
 */
