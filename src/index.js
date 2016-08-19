import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import imageData from './imageData';
import { assemble } from 'schematizr';

import { store } from './redux';

const loadImages = (images) => {
  return images.map(img => {
    return Object.assign({}, img, { loaded: false });
  })
}

const render = () => {
  const state = store.getState();
  return ReactDOM.render(
    <App {...state} />,
    document.getElementById('root')
  );
};

store.subscribe(render);
store.dispatch({ type: 'ADD_IMAGE_LINKS', images: loadImages(assemble(imageData)) });
