import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { toast } from '@/components/ui/toast'

export function useMenu() {
  return useQuery({
    queryKey: ['menu'],
    queryFn: () => api.get('/menu'),
    staleTime: 1000 * 60 * 5,
  })
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemData) => api.post('/menu', itemData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success('Menu Item Added', `Successfully added "${data.name}"`)
    },
    onError: (error) => {
      toast.error('Failed to Add Item', error.message || 'Error creating menu item')
    },
  })
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...itemData }) => api.put(`/menu/${id}`, itemData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success('Menu Item Updated', `Updated "${data.name}"`)
    },
    onError: (error) => {
      toast.error('Update Failed', error.message || 'Error updating menu item')
    },
  })
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => api.delete(`/menu/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success('Menu Item Removed', 'Item removed from database')
    },
    onError: (error) => {
      toast.error('Delete Failed', error.message || 'Error deleting menu item')
    },
  })
}
