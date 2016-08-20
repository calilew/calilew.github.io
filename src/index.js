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
const loadImages = (urls) => {
  urls.forEach((src) => {
    const load = new Image();
    load.src = src;
    // load.onload = () => document.body.appendChild(load)
  });
}

const loadAndAddImages = (images) => {
  return images.forEach(image => {
    const load = new Image();
    load.src = image.src;
    load.onload = () => setTimeout(() => store.dispatch({ type: 'ADD_IMAGE', image }), 0);
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
setTimeout(() => loadImages(['img/icons/cancel.png', 'img/icons/next.png', 'img/icons/back.png']), 0)
setTimeout(() => loadAndAddImages(imageData), 10);
store.subscribe(render);
render();

// store.dispatch({ type: 'ADD_IMAGE_LINKS', images: loadImages(assemble(imageData)) });
