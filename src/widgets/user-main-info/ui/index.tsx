import {
	ComputerSpecifications,
	GameStatistics,
	UsersAvatar,
} from '../../../entities/user-info'

export async function UserMainInfo() {
	return (
		<section className='flex flex-grow justify-between relative sm:flex-col lg:flex-row min-h-[30vh] mb-10 bg-darkGray rounded-3xl p-5'>
			<UsersAvatar />
			<GameStatistics />
			<ComputerSpecifications />
		</section>
	)
}
