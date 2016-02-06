import React, { Component } from 'react';
import DOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import FastClick from 'fastclick';

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

// Components
import Images from './Images';
import Slider from './Slider';

// Logic
import reducer, { ADD_IMAGE, ITEM_SELECT, TOGGLE_VIEW } from './redux/reducer';
import { assemble } from 'schematizr';
import { imageLinks, aSynceImageLoad } from './utils';

let store = createStore(reducer, applyMiddleware(createLogger()))
aSynceImageLoad(assemble(imageLinks()), store)

// Styles
import '!style!css!sass!../sass/main';

// Parent Component
export default class Page extends Component {
  render() {
    const { images, sliderView, selected } = this.props.store;
    return (
      <div>
        <div className="header-wrapper">
          <h1>Cali Lew</h1>
        </div>
        <Images
          images={images}
          handleSelect={(id) => {
            store.dispatch({ type: ITEM_SELECT, data: id })
            store.dispatch({ type: TOGGLE_VIEW })
          }}/>
        {sliderView ? (
          <Slider
            image={images[selected - 1]}
            selected={selected}
            handleSelect={(id) => store.dispatch({ type: ITEM_SELECT, data: id })}
            toggleView={() => store.dispatch({ type: TOGGLE_VIEW })}/>
        ) : ''}
      </div>
    );
  }
}

window.onresize = function() {
  console.log(window.innerWidth, window.innerHeight);
}

const render = () => DOM.render(<Page store={store.getState()} />, document.getElementById('main'))
store.subscribe(render);
render();
