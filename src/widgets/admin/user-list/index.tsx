'use client'

import { getAllUsers } from '@/entities/user/lib/server-users-functions/getAllUsers'
import { UserInfoInServerMongo } from '@/entities/user/types'
import UserAdminCard from '@/entities/user/ui/admin-user-card'
import { useEffect, useState } from 'react'

export default function AdminUserList() {
	const [users, setUsers] = useState<UserInfoInServerMongo[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		getAllUsers()
			.then(data => setUsers(data))
			.catch(err => setError(err.message))
			.finally(() => setLoading(false))
	}, [])

	const handleDeleteUser = (userId: string) => {
		setUsers(prev => prev.filter(u => u.userId !== userId))
	}

	const handleViewDetails = (user: UserInfoInServerMongo) => {
		// Здесь можно открыть модальное окно или перейти на страницу пользователя
		console.log('Открыть детали пользователя:', user.userName)
		// Например: router.push(`/admin/users/${user.userId}`);
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center h-64'>
				<p className='text-gray-500'>Загрузка пользователей...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className='bg-red-50 text-red-600 p-4 rounded'>
				Ошибка загрузки: {error}
			</div>
		)
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-2xl font-bold mb-8'>Панель администратора</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
				{users.map(user => (
					<UserAdminCard
						key={user.userId}
						user={user}
						onDelete={handleDeleteUser}
					/>
				))}
			</div>
		</div>
	)
}
