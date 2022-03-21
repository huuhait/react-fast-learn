import create from 'zustand';
import ApiClient from '../library/ApiClient';
import { Category, Product, SlideShow } from '../types';

type PublicStore = {
  slideshow: SlideShow[]
  categories: Category[]
  products: Product[]
  fetchSlideShow: () => Promise<unknown>
  fetchCategories: () => Promise<unknown>
  fetchProducts: () => Promise<unknown>
}

const usePublicStore = create<PublicStore>((set, get) => ({
  slideshow: [],
  categories: [],
  products: [],
  fetchSlideShow: async () => {
    try {
      const { data: slideshow } = await new ApiClient().get('slideshow');

      set({
        ...get(),
        slideshow,
      });
    } catch (error) {
      return error;
    }
  },
  fetchCategories: async () => {
    try {
      const { data: categories } = await new ApiClient().get('categories');

      set({
        ...get(),
        categories,
      });
    } catch (error) {
      return error;
    }
  },
  fetchProducts: async () => {
    try {
      const { data: products } = await new ApiClient().get('products');

      set({
        ...get(),
        products,
      });
    } catch (error) {
      return error;
    }
  },
}));

export default usePublicStore;
