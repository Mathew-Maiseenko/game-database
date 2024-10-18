export const TriplePointIcon = ({
	classes,
	loaderIconClasses = 'dark:fill-white dark:stroke-white fill-black stroke-black',
}: {
	classes?: string
	loaderIconClasses?: string
}) => (
	<svg
		className={classes}
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 200 200'
	>
		<circle
			className={loaderIconClasses}
			stroke-width='15'
			r='15'
			cx='40'
			cy='65'
		></circle>
		<circle
			className={loaderIconClasses}
			stroke-width='15'
			r='15'
			cx='100'
			cy='65'
		></circle>
		<circle
			className={loaderIconClasses}
			stroke-width='15'
			r='15'
			cx='160'
			cy='65'
		></circle>
	</svg>
)
