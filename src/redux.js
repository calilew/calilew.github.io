import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { findObjWith, assemble, disassemble } from 'schematizr';
import { head, drop } from 'ramda';

// INITIAL STATE
const initialState = {
  images: [],
  imageLinks: [],
  filter: '',
  loadeMore: true,
  selected: { id: null, position: { x: 0, y: 0 }, dimensions: { x: 0, y: 0, }}
}

// REDUCER
const imageReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case 'ADD_IMAGE_LINKS':
      return Object.assign({}, state, { imageLinks: action.images });
    case 'ADD_IMAGE':
      return Object.assign({}, state, { images: assemble([].concat(disassemble(state.images), [action.image])) });
    case 'IMAGE_LOADED':
      return Object.assign({}, state, {
        imageLinks: findObjWith(
          (obj) => Object.assign({}, obj, { loaded: true }),
          { src: action.src },
          state.imageLinks
        )
      })
    case 'SET_FILTER':
      return Object.assign({}, state, { filter: action.filter })
    case 'SELECT_IMAGE':
      return Object.assign({}, state, { selected: { id: action.id } })
    default:
      return state;
  }
}

// STORE
export const store = createStore(imageReducer, initialState, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// ACTIONS
export const loadNext = () => (dispatch, getState) => {
  const { imageLinks, loadeMore } = getState();
  const notYetLoaded = imageLinks.filter(img => !img.loaded);
  if (notYetLoaded.length > 0) {
    setTimeout(() => {
      const nextImage = head(notYetLoaded);
      const load = new Image();
      load.src = nextImage.src;
      load.onload = () => {
        dispatch({ type: 'IMAGE_LOADED', src: nextImage.src });
        dispatch({ type: 'ADD_IMAGE', image: { src: nextImage.src } });
        if (loadeMore) return dispatch(loadNext())
      }
      return null;
    }, 0)
  }
}
