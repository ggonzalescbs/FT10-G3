import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GUARDAR_PRODUCTOS,
  SET_SEARCH
} from "../actions";
//import allProducts from "../Apollo/queries/allProducts";

const initialState = {
  stateproducts: {},
  stateSearch: {},
  filterProduct: "",
  allProduct: [],
  search: false,
};
// SET_SEARCH
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: false };
    case GET_ALL_PRODUCTS:
      if (action.payload && state.allProduct.length === 0) {
        return {
          ...state,
          stateproducts: action.payload,
          allProduct: action.payload,
          search: false,
        };
      } else {
        return {
          ...state,
          stateproducts: action.payload,
          search: false,
        };
      }

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        filterProduct: action.payload,
        search: true,
      };

    case GUARDAR_PRODUCTOS:
      return {
        ...state,
        stateSearch: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

// return state.map((todo) =>
// todo.id === action.payload ? {...todo, status:"InProgress"} : todo
// );
