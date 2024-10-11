import {
	ComputerSpecifications,
	GameStatistics,
	UsersAvatar,
} from '../../../entities/user'

export function UserMainInfo() {
	return (
		<section className='flex flex-grow justify-between relative sm:flex-col md:flex-row min-h-[30vh] mb-10 bg-white dark:border-none border-2 border-lightThemeBorderGray dark:bg-whiteGray  rounded-3xl p-5'>
			<UsersAvatar />
			<GameStatistics />
			<ComputerSpecifications />
		</section>
	)
}
