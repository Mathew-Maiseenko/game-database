import { TagsAndGenresManipulator } from '@/widgets/admin/tags-and-genres-manipulator'
import AdminUserList from '@/widgets/admin/user-list'

export default function AdminPage() {
	return (
		<>
			<h1 className='text-2xl font-bold mb-8 text-black dark:text-white'>
				Панель администратора
			</h1>
			<TagsAndGenresManipulator />
			<AdminUserList />
		</>
	)
}
