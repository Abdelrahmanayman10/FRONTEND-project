import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { useAuthContext } from '@/Auth/AuthContext'
import { toast } from '@/components/ui/toast'

export function useProfile() {
  const { token } = useAuthContext()
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: () => api.get('/auth/profile'),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
  })
}

export function useLogin() {
  const { login } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials) => api.post('/auth/login', credentials),
    onSuccess: (data) => {
      login(data)
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      toast.success('Welcome back!', `Signed in as ${data.name || data.email}`)
    },
    onError: (error) => {
      toast.error('Login Failed', error.message || 'Invalid credentials')
    },
  })
}

export function useRegister() {
  const { login } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userData) => api.post('/auth/register', userData),
    onSuccess: (data) => {
      login(data)
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      toast.success('Account Created!', `Welcome to Bistro Bliss, ${data.name}`)
    },
    onError: (error) => {
      toast.error('Registration Failed', error.message || 'Could not create account')
    },
  })
}

export function useUpdateProfile() {
  const { login, user, token } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedFields) => api.put('/auth/profile', updatedFields),
    onSuccess: (data) => {
      // Preserve current token if backend response does not return new token
      login({ ...data, token: data.token || token })
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      toast.success('Profile Updated', 'Your profile details have been updated successfully.')
    },
    onError: (error) => {
      toast.error('Update Failed', error.message || 'Failed to update profile')
    },
  })
}
