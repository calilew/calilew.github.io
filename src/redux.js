import { createStore } from 'redux';
import { findObjWith } from 'schematizr';

const initialState = {
  images: [],
  filter: '',
  selected: { id: null, position: { x: 0, y: 0 }, dimensions: { x: 0, y: 0, }}
}

const imageReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case 'ADD_IMAGE_LINKS':
      return Object.assign({}, state, { images: action.images });
    case 'SET_IMAGE_LOADED':
      return findObjWith(
        (obj) => Object.assign({}, obj, { loaded: true, img: action.img }),
        { $id: action.id },
        state
      )
    case 'SET_FILTER':
      return Object.assign({}, state, { filter: action.filter })
    case 'SELECT_IMAGE':
      return Object.assign({}, state, { selected: { id: action.id } })
    default:
      return state;
  }
}

export const store = createStore(imageReducer, initialState,
  window.devToolsExtension && window.devToolsExtension()
);
