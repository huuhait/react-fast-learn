import create from "zustand";
import { UserState } from '../types'

type IUserStore = {
  uid?: string
  email?: string
  state?: UserState
}

const useUserStore = create<IUserStore>((set) => ({

}))

export default useUserStore
