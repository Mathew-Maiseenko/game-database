'use client'
import { useEffect, useState } from 'react'

interface ModalProps {
	isOpen: boolean
	setModalCloseFunction: () => void
	children: JSX.Element
}

export function Modal({
	children,
	isOpen = false,
	setModalCloseFunction,
}: ModalProps) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => {
				setIsModalOpen(false)
			}, 300)
		} else {
			setIsModalOpen(true)
		}
	}, [isOpen])

	if (isModalOpen) {
		return (
			<article onClick={setModalCloseFunction}>
				<section
					className={`${
						isOpen
							? 'flex flex-grow justify-center items-center '
							: 'animate-fast-modal-background-hiding'
					} z-40 fixed right-0 top-0 bottom-0 w-full min-h-screen transform transition-all duration-300 ease-in-out dark:bg-darkGray bg-lightThemeGray opacity-80 cursor-pointer`}
				></section>
				<section
					className={`${
						isOpen
							? 'flex flex-grow justify-center items-center animate-modal-showing'
							: 'animate-modal-hiding'
					} z-50 fixed right-0 top-0 bottom-0 w-full min-h-full transform transition-all duration-300 ease-in-out opacity-100 cursor-pointer`}
				>
					{children}
				</section>
			</article>
		)
	} else {
		return
	}
}
