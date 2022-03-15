interface WalletType {
  id: string
  is_active: boolean
  owner_type: string
  owner_id: string
  type: string
  number: string
  name: string
  code: string
  qr_code: string
  currency: string
  balance_amount: string
  hold_amount: string
  account_status: string
  account_status_date: string
  note: string | null
  created_by: string
  created_at: string
  updated_by: string
  updated_at: string
  status: boolean
}

export default WalletType
