import { Dispatch, SetStateAction, createContext } from 'react'

export const RoshiniSquadContext = createContext<{
  isUserEnabled: boolean
  setIsUserEnabled: Dispatch<SetStateAction<boolean>> | null
}>({
  isUserEnabled: false,
  setIsUserEnabled: null,
})
