export enum UserStatus {
  RERGISTERED = 'RERGISTERED',
  TERMINATED = 'TERMINATED',
}

export enum UserHistoryStatus {
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  TERMINATED = 'TERMINATED',
}

interface User {
  address: string
  apartment: string
  api_version: string
  avatar_url: string | null
  cart_count: number
  change_email: string | null
  change_otp_code: string | null
  change_otp_sent: string | null
  change_otp_type: string | null
  change_phone: string | null
  city_code: string
  country_code: string
  created_at: string
  created_by: string
  device_imei: string | null
  device_info: string | null
  device_token: string | null
  device_type: string | null
  email: string
  failed_login_attempt: string | null
  favorite_count: number
  first_name: string
  has_pin: boolean
  id: string
  is_active: boolean
  is_lock: boolean
  language: string
  last_logged_in: string
  last_name: string
  lock_date: string | null
  note: string | null
  order_count: number
  otp_code: string | null
  otp_method: string | null
  otp_sent: string | null
  phone: string
  pin: string | null
  pin_method: string | null
  pin_method_id: string | null
  session_id: string
  state_code: string
  status: boolean
  updated_at: string
  updated_by: string
  user_history_status: UserHistoryStatus | undefined
  user_status: UserStatus | undefined
  user_status_date: string
  username: string
  zipcode: string
}

export default User
