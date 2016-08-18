import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import { findObjWith } from 'schematizr';

const loadeImage = (src, id) => {
  const img = new Image();
  img.src = src;
  img.onload = function() {
    store.dispatch({ type: 'SET_IMAGE_LOADED', id })
  }
}
const getImages = () => {
  let ids = 0;
  const buildArray = (num, catagory) => {
    const iter = (acc, arr) => {
      if (acc === num + 1) return arr;
      const src = 'img/' + catagory + '/' + 'large/' + acc + '.jpg';
      ids ++;
      console.log(ids);
      loadeImage(src, ids)
      return iter(acc + 1, [].concat(arr, [{
        src,
        catagory,
        loaded: false,
        id: ids
      }]));
    };
    return iter(1, []);
  };
  // return [].concat(buildArray(3, 'fashion'), buildArray(3, 'portrait'), buildArray(3, 'travel'));
  return [].concat(buildArray(18, 'fashion'), buildArray(17, 'portrait'), buildArray(23, 'travel'));
}

const imageReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case 'ADD_IMAGE_LINKS':
      return Object.assign({}, state, { images: action.images });
    case 'SET_IMAGE_LOADED':
      return findObjWith(
        (obj) => Object.assign({}, obj, { loaded: true }),
        { id: action.id },
        state
      )
    default:
      return state;
  }
}

const logger = createLogger();
const store = createStore(
  imageReducer,
  applyMiddleware(logger)
);

const render = () => {
  const state = store.getState();
  return ReactDOM.render(
    <App {...state} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
store.dispatch({ type: 'ADD_IMAGE_LINKS', images: getImages() });
