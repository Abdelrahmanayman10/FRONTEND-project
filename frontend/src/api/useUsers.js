import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { useAuthContext } from '@/Auth/AuthContext'
import { toast } from '@/components/ui/toast'

export function useUsers() {
  const { user, token } = useAuthContext()
  const isAdmin = user?.role === 'admin'

  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users'),
    enabled: Boolean(token && isAdmin),
  })
}

export function useToggleUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.patch(`/users/${id}/role`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Role Updated', `User role changed to ${data.role}`)
    },
    onError: (error) => {
      toast.error('Role Update Failed', error.message || 'Could not update user role')
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User Removed', 'User account deleted successfully')
    },
    onError: (error) => {
      toast.error('Deletion Failed', error.message || 'Could not remove user')
    },
  })
}
