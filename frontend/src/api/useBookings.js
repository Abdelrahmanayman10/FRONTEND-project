import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { useAuthContext } from '@/Auth/AuthContext'
import { toast } from '@/components/ui/toast'

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookingData) => api.post('/bookings', bookingData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success('Reservation Submitted', `Table reserved for ${data.name} on ${data.date} at ${data.time}`)
    },
    onError: (error) => {
      toast.error('Booking Failed', error.message || 'Failed to submit reservation')
    },
  })
}

export function useMyBookings() {
  const { token } = useAuthContext()
  return useQuery({
    queryKey: ['bookings', 'my'],
    queryFn: () => api.get('/bookings/my-bookings'),
    enabled: Boolean(token),
  })
}

export function useAdminBookings() {
  const { user, token } = useAuthContext()
  const isAdmin = user?.role === 'admin'

  return useQuery({
    queryKey: ['bookings', 'all'],
    queryFn: () => api.get('/bookings'),
    enabled: Boolean(token && isAdmin),
  })
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }) => api.patch(`/bookings/${id}/status`, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success('Status Updated', `Reservation status changed to ${data.status}`)
    },
    onError: (error) => {
      toast.error('Update Failed', error.message || 'Could not update reservation status')
    },
  })
}
