import { findById } from 'schematizr';

export const ADD_IMAGE = 'ADD_IMAGE';
export const ITEM_SELECT = 'ITEM_SELECT';
export const TOGGLE_VIEW = 'TOGGLE_VIEW';

const initState = {
  images: [],
  selected: 0,
  sliderView: false
}

export default (state = initState, action) => {
  switch (action.type) {

    case ADD_IMAGE:
      const exists = state.images.filter(x => x._id === action.data._id);
      if(exists[0]) {
        // console.log('Going Large');
        return Object.assign({}, state, {
          images: findById(img => {
            return action.data
          }, state.images, action.data._id)
        })
      } else {
        // console.log('Initial Load');
        return Object.assign({}, state, {
          images: [].concat(state.images, action.data)
        })
      }

    case ITEM_SELECT:
      if(action.data > state.images.length) {
        return Object.assign({}, state, {
          selected: 1
        })
      } else if (action.data < 1) {
        return Object.assign({}, state, {
          selected: state.images.length
        })
      }
      return Object.assign({}, state, {
        selected: action.data
      })

    case TOGGLE_VIEW:
      return Object.assign({}, state, {
        sliderView: !state.sliderView
      })

    default:
      return state;
  }
}
