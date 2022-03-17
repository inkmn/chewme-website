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
  let data
  const response = await fetch(input, {
    ...args,
    headers: {
      ...defaultHeaders,
      ...(args || {}).headers,
    },
  })
  let error = new ValidationError(response.statusText)
  try {
    // if the server replies, there's always some data in json
    data = await response.json()
  } catch (err) {
    error.data = { code: '500', message: 'Internal error' }
    error.status = response.status
    throw error
  }
  if (!response.ok) {
    const error = new ValidationError(response.statusText)
    error.data = data
    error.status = response.status
    throw error
  }
  return data
}

export default privatefetcher
