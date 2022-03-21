import create from 'zustand';
import ApiClient from '../library/ApiClient';
import { UserState } from '../types';

type IUserStore = {
  uid?: string
  email?: string
  state?: UserState
  Login: (email: string, password: string) => Promise<unknown>
}

const useUserStore = create<IUserStore>((set, get) => ({
  Login: async (email: string, password: string) => {
    try {
      const { data } = await new ApiClient().post('/login', {
        email,
        password,
      });

      set({
        ...get(),
        uid: data.uid,
        email: data.email,
        state: data.state,
      });
    } catch (error) {
      return;
    }
  },
}));

export default useUserStore;
