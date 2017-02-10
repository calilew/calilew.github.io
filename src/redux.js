import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import R from 'ramda';

// INITIAL STATE
const initialState = {
  lastSelected: '',
  images: [],
}

// REDUCER
const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_IMAGE_DATA':
      return R.merge(state, { images: action.imageData });
    case 'LOAD_IMAGE':
      return R.merge(state, { images: state.images.map(img => img.$id === action.id ? R.merge(img, { loaded: true }) : img) });
    case 'LAST_SELECTED':
      return R.merge(state, { lastSelected: action.id });
    default:
      return state;
  }
}

// STORE
export const store = createStore(imageReducer, initialState, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
