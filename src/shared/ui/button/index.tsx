import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
}

export function Button({ children, className, ...rest }: ButtonProps) {
	return (
		<button
			className={`w-1/2 rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}
