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
	return (
		<article onClick={setModalCloseFunction}>
			<section
				className={`${
					isOpen ? 'flex flex-grow justify-center items-center' : 'hidden'
				} z-40 fixed right-0 top-0 bottom-0 w-full min-h-screen transform transition-all duration-300 ease-in-out dark:bg-darkGray bg-lightThemeGray opacity-80 cursor-pointer`}
			></section>
			<section
				className={`${
					isOpen ? 'flex flex-grow justify-center items-center' : 'hidden'
				} z-50 fixed right-0 top-0 bottom-0 w-full min-h-full transform transition-all duration-300 ease-in-out opacity-100 cursor-pointer`}
			>
				{children}
			</section>
		</article>
	)
}

/*
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
	return (
		<>
			<section
				onClick={setModalCloseFunction}
				className={`${
					isOpen ? 'flex flex-grow justify-center items-center' : 'hidden'
				} z-40 fixed right-0 top-0 bottom-0 w-full min-h-screen transform transition-all duration-300 ease-in-out dark:bg-darkGray bg-lightThemeGray opacity-80 cursor-pointer`}
			></section>
			<section
				onClick={e => e.stopPropagation()}
				className={`${
					isOpen ? 'flex flex-grow justify-center items-center' : 'hidden'
				} z-50 fixed right-0 top-0 bottom-0 w-full min-h-full transform transition-all duration-300 ease-in-out opacity-100`}
			>
				{children}
			</section>
		</>
	)
}

*/
