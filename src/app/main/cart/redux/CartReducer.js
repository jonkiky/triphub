import {ADD_TO_CART,INIT_CART,DELETE_FROM_CART,READY_CART} from './CartAction';

export const initialState = {
  places: [],   // place_ids
  error: '',
  isError: false,
};


const deletePlaces = (selectedPlaces, places) => {
  if (!selectedPlaces || selectedPlaces.length === 0) return places;
  return places.filter((id) => !selectedPlaces.includes(id));
};



const shouldInitCart = (state) => state.cart.places !== JSON.parse(localStorage.getItem('cart'));


export const getCart = () => ({
  type: INIT_CART,
});

const readyCart = () => ({
  type: READY_CART,
});


export function initCart() {
  return (dispatch, getState) => {
    if (shouldInitCart(getState())) {
      return dispatch(getCart());
    }
    return dispatch(readyCart());
  };
}


export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
       const previousStatCart = Object.assign([], state.places);
       const uniquePlaces = action.payload.places.length > 0
        ? Array.from(
          new Set(
            previousStatCart.concat(action.payload.places),
          ),
        ) : previousStatCart;
      localStorage.setItem('cart', JSON.stringify(uniquePlaces) || []);
       return {
        ...state,
        isError: false,
        places: uniquePlaces,
      };
    }

    case INIT_CART: {
      return {
         ...state,
        isError: false,
        places: JSON.parse(localStorage.getItem('cart')) || [],
      };
    }


    case DELETE_FROM_CART: {
       const placesAfterDeletion = deletePlaces(action.payload.places, state.places);
      localStorage.setItem('cart', JSON.stringify(placesAfterDeletion));
      return {
        ...state,
        isError: false,
        places: placesAfterDeletion,
      };
    }

    case READY_CART: return state;
    default:  return state;
  }
}