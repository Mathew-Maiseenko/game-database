'use client'
import { TagsAndGenresManipulator } from '@/widgets/admin/tags-and-genres-manipulator'
import AdminUserList from '@/widgets/admin/user-list'

import { notFound } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
	useEffect(() => {
		const isAdmin = localStorage.getItem('isAdmin') === 'true'
		if (!isAdmin) {
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
