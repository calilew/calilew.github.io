import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import imageData from './imageData';
import { store } from './redux';
import 'basscss/css/basscss.min.css';

import App from './App';
import LightBox from './LightBox/LightBox';
import LightBoxSlider from './LightBoxSlider/LightBoxSlider';

const loadAllImages = (images) => images.map(image => {
  setTimeout(() => {
    const load = new Image();
    load.src = image.src;
    load.onload = () => setTimeout(() => store.dispatch({ type: 'LOAD_IMAGE', id: image.$id }), 0);
  }, 0);
  return image;
})

const loadIcons = () => {
  const cancel = new Image();
  cancel.src = 'resources/icons/cancel.png';

  const back = new Image();
  back.src = 'resources/icons/back.png';

  const next = new Image();
  next.src = 'resources/icons/next.png';
}


loadIcons();
store.dispatch({ type: 'ADD_IMAGE_DATA', imageData });
setTimeout(() => loadAllImages(imageData), 0);

const render = () => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/photos/:id" component={LightBoxSlider} />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render();
