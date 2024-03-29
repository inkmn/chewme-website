import { ADD_TO_CART, CHECKOUT_REQUEST, CHECKOUT_FAILURE } from '../types'

const initialState = {
  addedIds: [],
  quantityById: {},
}

const addedIds = (
  state = initialState.addedIds as any,
  action: {
    type: string
    productId: string
  }
) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [...state, action.productId]
    default:
      return state
  }
}

const quantityById = (
  state = initialState.quantityById as any,
  action: any
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state, [productId]: (state[productId] || 0) + 1 }
    default:
      return state
  }
}

const cart = (state = initialState, action: any) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      }
  }
}

export default cart
