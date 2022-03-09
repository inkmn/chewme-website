import router from 'next/router'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

class ValidationError extends Error {
  data: unknown
  status: unknown
  constructor(message: string | undefined) {
    super(message)
    this.data = message
    this.status = message
  }
}

const isBrowser = (): boolean => {
  return typeof window !== 'undefined'
}

let host: string | undefined = ''

if (process.env.NODE_ENV === 'production') {
  if (!isBrowser()) {
    host = process.env.NEXT_PUBLIC_ENV_API_HOST
  }
} else {
  if (!isBrowser()) {
    host = process.env.NEXT_PUBLIC_ENV_API_HOST
  }
}

const http = async <T>(input: string, args: RequestInit): Promise<T> => {
  const url = `${host}${input}`
  const token = cookies.get('token')
  const defaultHeaders: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...args,
    headers: {
      ...defaultHeaders,
      ...(args || {}).headers,
    },
  })
  if (response.status === 401) {
    if (isBrowser()) {
      router.push('/login')
    }
  }

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json()
  if (!response.ok) {
    const error = new ValidationError(response.statusText)
    error.data = data
    error.status = response.status
    throw error
  }
  return data
}

export default http
