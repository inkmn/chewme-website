import { ValidationError } from '@/utils/errors'

const PublicFetcher = async <T>(
  input: string,
  args: RequestInit
): Promise<T> => {
  const defaultHeaders: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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

export default PublicFetcher
