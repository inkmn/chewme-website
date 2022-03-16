import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'

interface AppContextType {
  loginModal: boolean
  setLoginModal: (visible: boolean) => void
  cartDrawer: boolean
  setCartDrawer: (visible: boolean) => void
  menuDrawer: boolean
  setMenuDrawer: (visible: boolean) => void
}

const AppContext = createContext<AppContextType>({
  loginModal: false,
  setLoginModal: () => {},
  cartDrawer: false,
  setCartDrawer: () => {},
  menuDrawer: false,
  setMenuDrawer: () => {},
})

const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const initData = useContext(AppContext)
  const [loginModal, setLoginModal] = useState(initData.loginModal)
  const [cartDrawer, setCartDrawer] = useState(initData.cartDrawer)
  const [menuDrawer, setMenuDrawer] = useState(initData.menuDrawer)
  if (router.events) {
    router.events.on('routeChangeComplete', () => {
      setMenuDrawer(false)
      setCartDrawer(false)
    })
  }

  const sharedState: AppContextType = {
    loginModal,
    setLoginModal,
    cartDrawer,
    setCartDrawer,
    menuDrawer,
    setMenuDrawer,
  }

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export default AppProvider
