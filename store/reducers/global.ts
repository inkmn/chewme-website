const initialState = {
  user: {},
  s3: 'http://dev-ep-s3.goodtech.mn/',
  cart: [],
}

const global = (state = initialState, action: any): any => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        ...action.payload,
      }

    case 'CHANGE_USER':
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}

export default global
