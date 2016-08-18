import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import { assemble, findObjWith } from 'schematizr';
import imageData from './imageData';

const loadeImage = (src, id) => {
  const img = new Image();
  img.src = src;
  img.onload = function() {
    store.dispatch({ type: 'SET_IMAGE_LOADED', img, id })
  }
}

const loadImages = (images) => {
  return images.map(img => {
    // const m = new Image();
    // m.src = img.src;
    // m.onload = () => store.dispatch({ type: 'SET_IMAGE_LOADED', id: img.$id })
    return Object.assign({}, img, { loaded: false });
  })
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
    default:
      return state;
  }
}

const logger = createLogger();
const store = createStore(imageReducer);

const render = () => {
  const state = store.getState();
  return ReactDOM.render(
    <App {...state} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
store.dispatch({ type: 'ADD_IMAGE_LINKS', images: loadImages(assemble(imageData)) });
