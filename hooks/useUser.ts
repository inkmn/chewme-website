import User from '@/interfaces/user'
import useSWR from 'swr'
import privatefetcher from '@/lib/privateFetch'

const useUser = (): {
  user: User
  error: {
    status: number
    data: any
  }
  isValidating: boolean
  mutate: () => void
} => {
  const {
    data = {
      address: '',
      apartment: '',
      api_version: '',
      avatar_url: '',
      cart_count: 0,
      change_email: '',
      change_otp_code: '',
      change_otp_sent: '',
      change_otp_type: '',
      change_phone: '',
      city_code: '',
      country_code: '',
      created_at: '',
      created_by: '',
      device_imei: '',
      device_info: '',
      device_token: '',
      device_type: '',
      email: '',
      failed_login_attempt: '',
      favorite_count: 0,
      first_name: '',
      has_pin: false,
      id: '',
      is_active: false,
      is_lock: false,
      language: '',
      last_logged_in: '',
      last_name: '',
      lock_date: '',
      note: '',
      order_count: 0,
      otp_code: '',
      otp_method: '',
      otp_sent: '',
      phone: '',
      pin: '',
      pin_method: '',
      pin_method_id: '',
      session_id: '',
      state_code: '',
      status: false,
      updated_at: '',
      updated_by: '',
      user_history_status: undefined,
      user_status: undefined,
      user_status_date: '',
      username: '',
      zipcode: '',
    },
    error,
    isValidating,
    mutate,
  } = useSWR<User>('/app/auth/me', privatefetcher)

  return { user: data, error, isValidating, mutate }
}

export default useUser
