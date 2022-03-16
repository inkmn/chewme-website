import moment from 'moment'

export const dateFormat = (date: moment.MomentInput): string =>
  date ? moment(date).format('YYYY-MM-DD') : '____-__-__'
export const datetimeFormat = (date: moment.MomentInput): string =>
  date ? moment(date).format('YYYY-MM-DD HH:mm') : '____-__-__ __:__'

export const startsWithHttp = /^https?:\/\//i

export const checkAbsoluteUrl = (urlString: string): boolean =>
  startsWithHttp.test(urlString)

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const formatterUSD = (value: any): any => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(value)
}

export const getStatusData = (val: string): any => {
  const status: any = {
    CREATED: {
      text: 'Илгээсэн',
      color: 'blue',
    },
    REJECTED: {
      text: 'Буцаасан',
      color: 'red',
    },
    APPROVED: {
      text: 'Баталгаажуулсан',
      color: 'green',
    },
  }
  return status[val] || { text: 'Тодорхойгүй', color: 'grey' }
}
