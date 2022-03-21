import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart } from '../types';

type CartStore = {
  carts: Cart[]
  Add: (product_id: number, quantity: number) => void
  Remove: (product_id: number) => void
  Set: (product_id: number, quantity: number) => void
}

const useCartStore = create<CartStore>(persist(
  (set, get) => ({
    carts: [],
    Add: (product_id: number, quantity: number) => {
      const state = get();
      const index = state.carts.findIndex((c) => c.product_id === product_id);

      if (index >= 0) {
        state.carts[index] = { product_id, quantity: state.carts[index].quantity + quantity };
      } else {
        state.carts.push({ product_id, quantity });
      }

      set({
        ...state,
      });
    },
    Remove: (product_id: number) => {
      const state = get();
      const index = state.carts.findIndex((c) => c.product_id === product_id);

      if (index >= 0) {
        state.carts.splice(index, 1);
      }

      set({
        ...state,
      });
    },
    Set: (product_id: number, quantity: number) => {
      const state = get();
      const index = state.carts.findIndex((c) => c.product_id === product_id);

      if (index >= 0) {
        state.carts[index].quantity = quantity;
      }

      set({
        ...state,
      });
    },
  }),
  {
    name: 'cart-storage', // unique name
    getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
  },
));

export default useCartStore;
