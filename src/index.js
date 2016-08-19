import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import imageData from './imageData';
import { uniq } from 'ramda';
// import { assemble } from 'schematizr';

import { store } from './redux';

// const loadImages = (images) => {
//   return images.map(img => {
//     const load = new Image();
//     load.src = img.src;
//     load.onload = () => setTimeout(() => store.dispatch({ type: 'IMAGE_LOADED', src: img.src }), 0);
//     return Object.assign({}, img, { loaded: false });
//   })
// }

const loadAndAddImages = (images) => {
  return images.forEach(image => {
    const load = new Image();
    load.src = image.src;
    load.onload = () => setTimeout(() => store.dispatch({ type: 'ADD_IMAGE', image }));
    return image;
  })
}

const render = () => {
  const state = store.getState();
  return ReactDOM.render(
    <App {...state} />,
    document.getElementById('root')
  );
};

loadAndAddImages(imageData);
store.subscribe(render);
render();

// store.dispatch({ type: 'ADD_IMAGE_LINKS', images: loadImages(assemble(imageData)) });
