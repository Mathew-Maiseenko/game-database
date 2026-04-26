'use client'
import { checkIsAdmin } from '@/entities/user/lib/check-is-user-admin'
import { TagsAndGenresManipulator } from '@/widgets/admin/tags-and-genres-manipulator'
import AdminUserList from '@/widgets/admin/user-list'

import { notFound } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
	useEffect(() => {
		if (!checkIsAdmin) {
			notFound()
		}
	}, [])

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
