import { generateQuery } from './helperFunctions';

export const ProductManagementApi = {
   addItemToCart: {
      api: 'cart/item',
      method: 'post',
      baseURL: 'default',
   },
   getProductList: {
      url: 'product',
      method: 'get',
      baseURL: 'default',
      query: {
         limit: 10,
         page: 1,
      },
      get api() {
         return this.url + generateQuery(this.query)
      },
      set addQuery({ key, payload }) {
         this.query[key] = payload
      },
   }
}


export const CartManagementApi = {
   addItemToCart: {
      api: 'cart/item',
      method: 'post',
      baseURL: 'default',
   },
   getCartList: {
      url: 'cart',
      method: 'get',
      baseURL: 'default',
      query: {
         userId: 'User4',
         cartId: 1,
      },
      get api() {
         return this.url + generateQuery(this.query)
      },
      set addQuery({ key, payload }) {
         this.query[key] = payload
      },
   }

}