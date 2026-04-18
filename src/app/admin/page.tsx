import { TagsAndGenresManipulator } from '@/widgets/admin/tags-and-genres-manipulator'
import AdminUserList from '@/widgets/admin/user-list'

export default function AdminPage() {
	return (
		<>
			<TagsAndGenresManipulator />
			<AdminUserList />
		</>
	)
}
