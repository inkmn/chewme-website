export enum UserStatus {
  RERGISTERED = 'RERGISTERED',
  TERMINATED = 'TERMINATED',
}

export enum UserHistoryStatus {
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  TERMINATED = 'TERMINATED',
}

interface User {
  id: string | undefined
  is_active: boolean
  username: string | undefined
  api_version: string | undefined
  language: string | undefined
  has_pin: boolean
  pin_method: string | null
  pin_method_id: string | null
  pin: string | null
  first_name: string | undefined
  last_name: string | undefined
  phone: string | undefined
  change_phone: string | null
  email: string | undefined
  change_email: string | null
  avatar_url: string | null
  session_id: string | undefined
  otp_method: string | undefined
  otp_code: string | undefined
  otp_sent: string | undefined
  change_otp_type: string | undefined
  change_otp_code: string | undefined
  change_otp_sent: string | undefined
  device_type: string | null
  device_info: string | null
  device_token: string | null
  device_imei: string | null
  last_logged_in: string | undefined
  failed_login_attempt: string | undefined
  lock_date: string | undefined
  is_lock: boolean
  user_history_status: UserHistoryStatus
  user_status: UserStatus
  user_status_date: string | undefined
  note: string | null
  created_by: string | undefined
  created_at: string | undefined
  updated_by: string | undefined
  updated_at: string | undefined
  status: boolean
  cart_count: number
  order_count: number
  favorite_count: number
}

export default User
