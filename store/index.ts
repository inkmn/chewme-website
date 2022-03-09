import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

let store: any
const initialState = {
  global: {
    user: {},
    s3: 'http://dev-ep-s3.goodtech.mn/',
  },
}

// const reducer = (state = initialState, action: any): any => {
//   switch (action.type) {
//     case 'INIT':
//       return {
//         ...state,
//         ...action.payload,
//       }

//     case 'CHANGE_USER':
//       return {
//         ...state,
//         user: action.payload,
//       }

//     default:
//       return state
//   }
// }

const initStore = (preloadedState = initialState): any => {
  return createStore(
    reducer,
    { ...initialState, ...preloadedState },
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState?: any): any => {
  const _store = store ?? initStore(preloadedState)

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any): any {
  const store = useMemo(() => {
    return initializeStore(initialState)
  }, [initialState])
  return store
}
