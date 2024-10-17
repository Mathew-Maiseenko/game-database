import {
	ComputerSpecifications,
	GameStatistics,
	UsersAvatar,
} from '../../../entities/user'

export function UserMainInfo() {
	return (
		<section className='flex flex-grow justify-between relative sm:flex-col md:flex-row min-h-[30vh] mb-4 md:mb-7 lg:mb-10 bg-white dark:border-none border-2 border-lightThemeBorderGray dark:bg-whiteGray rounded-2xl p-4 md:p-5 lg:p-6 xl:p-7'>
			<UsersAvatar />
			<GameStatistics />
			<ComputerSpecifications />
		</section>
	)
}
