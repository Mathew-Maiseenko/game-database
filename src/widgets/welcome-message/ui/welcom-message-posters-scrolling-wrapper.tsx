'use client'
import { RawgApi } from '@/shared/api/RawgApi-hook'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import logo from '../../../../public/logo.png'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { filteredGamesSlice } from '@/features/filtration'

export function WelcomeMessagePostersScrollingWrapper({
	children,
}: {
	children: JSX.Element
}) {
	const [position, setPosition] = useState(0)
	const [curPoster, setCurPoster] = useState(1)
	const [gamesPosters, setGamesPosters] = useState<string[]>([])
	const welcomeMessageRef = useRef<HTMLDivElement | null>(null)

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
				if (welcomeMessageRef.current) {
					if (curPoster < gamesPosters.length) {
						const parentWidth = welcomeMessageRef.current.offsetWidth
						setPosition(prevPosition => prevPosition - parentWidth)
						setCurPoster(prevPoster => prevPoster + 1)
					} else {
						setCurPoster(1)
						setPosition(0)
					}
				}
			}, 3000)
			return () => clearInterval(movingProcessInterval)
		}
	}, [welcomeMessageRef, gamesPosters.length, curPoster])

	return (
		<section
			ref={welcomeMessageRef}
			className='relative inline-flex flex-col justify-between min-w-full min-h-[46vh] dark:border-none border-2 border-lightThemeBorderGray mb-10 rounded-3xl overflow-hidden'
		>
			<Image
				className='absolute top-0 left-0 z-10 w-full h-full'
				src={logo}
				width={1080}
				height={720}
				alt='Empty poster'
			/>
			<article
				style={{ transform: `translateX(${position}px)` }}
				className={`flex flex-grow transition-transform duration-500 ease-out transform absolute top-0 left-0 origin-top-right h-full z-20 `}
			>
				<ViewPostersList
					width={
						welcomeMessageRef.current
							? welcomeMessageRef.current.offsetWidth
							: 0
					}
					posters={gamesPosters}
				/>
			</article>
			{children}
		</section>
	)
}

function ViewPostersList({
	posters,
	width,
}: {
	posters: string[]
	width?: number
}) {
	return posters.map((poster, i) => (
		<article
			style={{
				background: `left / cover no-repeat url(${poster})`,
			}}
			key={`Game poster ${i}`}
			className={`w-screen object-cover flex flex-grow `}
		/>
	))
}
