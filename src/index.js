import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import imageData from './imageData';
import { store } from './redux';

import App from './App';
import LightBox from './LightBox/LightBox';

const loadAllImages = (images) => images.map(image => {
  setTimeout(() => {
    const load = new Image();
    load.src = image.src;
    load.onload = () => setTimeout(() => store.dispatch({ type: 'LOAD_IMAGE', id: image.$id }), 0);
  }, 0);
  return image;
})

store.dispatch({ type: 'ADD_IMAGE_DATA', imageData });
setTimeout(() => loadAllImages(imageData), 0);

const render = () => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/photos/:id" component={LightBox} />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render();
