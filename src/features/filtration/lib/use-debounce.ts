import { useCallback, useRef } from 'react'

export function useDebounce(
	callback: (...args: string[]) => void,
	delay: number
) {
	let timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null> =
		useRef(null)

	const debounceCallBack = useCallback(
		(...args: string[]) => {
			if (timer.current) {
				clearTimeout(timer.current)
			}

			timer.current = setTimeout(() => {
				callback(...args)
			}, delay)
		},
		[callback, delay]
	)

	return debounceCallBack
}
