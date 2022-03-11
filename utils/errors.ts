export class ValidationError extends Error {
  data: unknown
  status: number | undefined
  constructor(message: string | undefined) {
    super(message)
    this.data = {}
    this.status = 200
  }
}

export class UnauthorizedError extends Error {
  data: unknown
  status: unknown
  constructor(message: string | undefined) {
    super(message)
    this.data = message
    this.status = message
  }
}

export class InternalServerError extends Error {
  data: unknown
  status: unknown
  constructor(message: string | undefined) {
    super(message)
    this.data = message
    this.status = message
  }
}
