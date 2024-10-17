'use client'
import { RawgApi } from '@/shared/api/RawgApi-hook'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '../../../../public/logo.png'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { filteredGamesSlice } from '@/features/filtration'
import { useWindowWidth } from '@/shared/model'

export function WelcomeMessagePostersScrollingWrapper({
	children,
}: {
	children: JSX.Element
}) {
	const windowWidth = useWindowWidth()
	const [position, setPosition] = useState(0)
	const [curPoster, setCurPoster] = useState(1)
	const [gamesPosters, setGamesPosters] = useState<string[]>([])

	const dispatch = useAppDispatch()
	const gameGenres = useAppSelector(
		filteredGamesSlice.selectors.selectGenreList
	)

	useEffect(() => {
		if (gameGenres.length) {
			const postersFromGenres = gameGenres.map(genre => genre.image)
			setGamesPosters(postersFromGenres)
		} else {
			RawgApi.getGenresList().then(res => {
				const postersFromGenres = res.map(genre => genre.image)
				setGamesPosters(postersFromGenres)
				dispatch(filteredGamesSlice.actions.initGenres(res))
			})
		}
	}, [])

	useEffect(() => {
		if (gamesPosters.length) {
			const movingProcessInterval = setInterval(() => {
				if (curPoster < gamesPosters.length) {
					setPosition(prevPosition => prevPosition - windowWidth)
					setCurPoster(prevPoster => prevPoster + 1)
				} else {
					setCurPoster(1)
					setPosition(0)
				}
			}, 3000)
			return () => clearInterval(movingProcessInterval)
		}
	}, [gamesPosters.length, curPoster, windowWidth])

	return (
		<section className='relative inline-flex flex-col justify-between min-w-full md:min-h-[50vh] dark:border-none border-2 border-lightThemeBorderGray mb-10 rounded-3xl overflow-hidden'>
			<Image
				className='absolute top-0 left-0 z-0 w-full h-full'
				src={logo}
				width={1080}
				height={720}
				alt='Empty poster'
			/>
			<article
				style={{ transform: `translateX(${position}px)` }}
				className={`flex flex-grow transition-transform duration-500 ease-out transform absolute top-0 left-0 origin-top-right h-full z-10 `}
			>
				<ViewPostersList posters={gamesPosters} />
			</article>
			{children}
		</section>
	)
}

function ViewPostersList({ posters }: { posters: string[] }) {
	return posters.map((poster, i) => (
		<article
			style={{
				background: `center / cover no-repeat url(${poster})`,
			}}
			key={`Game poster ${i}`}
			className={`w-screen object-cover flex flex-grow brightness-50`}
		/>
	))
}
