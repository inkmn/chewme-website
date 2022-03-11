import router from 'next/router'
import User, { UserStatus } from '@/interfaces/user'
import useSWR from 'swr'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const useUser = ({
  redirectTo,
}: {
  redirectTo?: string
} = {}): {
  user: User
  mutateUser: () => void
  admin_status: UserStatus
  isLoading: boolean
  isError: boolean
  isLogged: boolean
} => {
  const token = cookies.get('token')
  if (!token && redirectTo && typeof window !== 'undefined') {
    router.push(redirectTo)
  }

  const {
    data: user = {
      id: undefined,
      user_id: undefined,
      username: undefined,
      is_active: false,
      lastname: undefined,
      firstname: undefined,
      avatar: undefined,
      email: undefined,
      new_email: undefined,
      phone: undefined,
      new_phone: undefined,
      address: undefined,
      verify_type: undefined,
      verify_code: undefined,
      verify_time: undefined,
      session_id: undefined,
      created_by: undefined,
      created_at: undefined,
      updated_by: undefined,
      updated_at: undefined,
      status: false,
    },
    error,
    mutate,
  } = useSWR(token ? '/app/auth/me' : null, async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 401) {
      if (typeof window !== 'undefined' && redirectTo) {
        router.push(redirectTo)
      }
    }
    const me = await response.json()
    return me
  })

  const isLogged = !!(!error && token)
  return {
    user,
    mutateUser: mutate,
    admin_status: user.admin_status,
    isLoading: !error && !user,
    isError: error,
    isLogged,
  }
}

export default useUser
