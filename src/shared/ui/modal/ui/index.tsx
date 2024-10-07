import type { Dispatch, SetStateAction } from 'react'

interface ModalProps {
	isOpen: boolean
	setIsOpen?: Dispatch<SetStateAction<boolean>>
	children: JSX.Element
}

export function Modal({ children, isOpen = false }: ModalProps) {
	// const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<section
				className={`${
					isOpen ? 'flex flex-grow justify-center items-center' : 'hidden'
				} z-40 fixed right-0 top-0 bottom-0 w-full min-h-screen transform transition-all duration-300 ease-in-out dark:bg-darkGray bg-lightThemeGray opacity-80`}
			></section>
			<section
				className={`${
					isOpen ? 'flex flex-grow justify-center items-center' : 'hidden'
				} z-50 fixed right-0 top-0 bottom-0 w-full min-h-full transform transition-all duration-300 ease-in-out opacity-100`}
			>
				{children}
			</section>
		</>
	)
}
