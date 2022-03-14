import { useState } from 'react'

const useCart = (initialState?: any): [boolean, (visible: boolean) => void] => {
  const [visible, setVisible] = useState(initialState)
  return [visible, setVisible]
}

export default useCart
