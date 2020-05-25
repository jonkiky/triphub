export const ADD_TO_CART = 'ADD_TO_CART';
export const INIT_CART = 'INIT_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const READY_CART='READY_CART';


export const deleteFromCartAction = (payload) => ({
  type: DELETE_FROM_CART,
  payload,
});


export const initCart = () => ({
  type: INIT_CART,
});


export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

