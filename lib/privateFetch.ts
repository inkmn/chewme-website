import { ValidationError } from '@/utils/errors'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const privatefetcher = async <T>(
  input: string,
  args: RequestInit
): Promise<T> => {
  const token = cookies.get('token')
  if (!token) {
    const error = new ValidationError('Unauthorized')
    error.data = { code: 401, message: 'Unauthorized' }
    error.status = 401
    throw error
  }

  const defaultHeaders: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(input, {
    ...args,
    headers: {
      ...defaultHeaders,
      ...(args || {}).headers,
    },
  })
  // if the server replies, there's always some data in json
  const data = await response.json()
  if (!response.ok) {
    const error = new ValidationError(response.statusText)
    error.data = data
    error.status = response.status
    throw error
  }
  return data
}

export default privatefetcher
