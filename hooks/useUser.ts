import User, { UserHistoryStatus, UserStatus } from '@/interfaces/user'
import useSWR from 'swr'
import Privatefetcher from '@/lib/privateFetch'

const useUser = (): {
  user: User
  error:
    | {
        status: number
        data: any
      }
    | undefined
  isValidating: boolean
  mutate: () => void
} => {
  const {
    data = {
      id: undefined,
      is_active: false,
      username: undefined,
      api_version: undefined,
      language: undefined,
      has_pin: false,
      pin_method: null,
      pin_method_id: null,
      pin: null,
      first_name: undefined,
      last_name: undefined,
      phone: undefined,
      change_phone: null,
      email: undefined,
      change_email: null,
      avatar_url: null,
      session_id: undefined,
      otp_method: undefined,
      otp_code: undefined,
      otp_sent: undefined,
      change_otp_type: undefined,
      change_otp_code: undefined,
      change_otp_sent: undefined,
      device_type: null,
      device_info: null,
      device_token: null,
      device_imei: null,
      last_logged_in: undefined,
      failed_login_attempt: undefined,
      lock_date: undefined,
      is_lock: false,
      user_history_status: UserHistoryStatus.CHANGE_PASSWORD,
      user_status: UserStatus.RERGISTERED,
      user_status_date: undefined,
      note: null,
      created_by: undefined,
      created_at: undefined,
      updated_by: undefined,
      updated_at: undefined,
      status: false,
      cart_count: 0,
      order_count: 0,
      favorite_count: 0,
    },
    error,
    isValidating,
    mutate,
  } = useSWR<User>('/app/auth/me', Privatefetcher)

  return { user: data, error, isValidating, mutate }
}

export default useUser
