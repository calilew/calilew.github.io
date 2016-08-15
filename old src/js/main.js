import React, { PropTypes } from 'react';
import DOM from 'react-dom';
import { createStore } from 'redux';

import FastClick from 'fastclick';

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});



// Components
import Gallery from './Gallery';
import Slider from './Slider';
import Header from './Header';

// Logic
import reducer, { ITEM_SELECT, TOGGLE_VIEW, CHANGE_FILTERS } from './redux/reducer';
import { assemble } from 'schematizr';
import { imageLinks, aSynceImageLoad, filterImages } from './utils';

const store = createStore(reducer);
aSynceImageLoad(assemble(imageLinks()), store);

// Styles
import '!style!css!sass!../sass/main';

// Parent Component
const handleFilters = (filters) => (event) => {
  const filter = event.target.innerHTML.toLowerCase();
  if (filters.filter(filt => filt === filter).length > 0) {
    return store.dispatch({ type: CHANGE_FILTERS, filters: [] });
  }
  return store.dispatch({ type: CHANGE_FILTERS, filters: [filter] });
};

const Page = (state) => {
  const { images, sliderView, selected, filters } = state.store;
  const getSizes = () => {
    console.log(imageLinks().map(x => x.large));
  }
  return (
    <div className="site-wrapper" onClick={getSizes}>
      <Header handleFilters={handleFilters(filters)} filters={filters} />
      <Gallery
        images={images}
        filters={filters}
        handleSelect={(id) => {
          store.dispatch({ type: ITEM_SELECT, data: id });
          store.dispatch({ type: TOGGLE_VIEW });
        }}
      />
      {sliderView ? (
        <Slider
          image={images[selected - 1]}
          selected={selected}
          handleSelect={(id) => store.dispatch({ type: ITEM_SELECT, data: id })}
          toggleView={() => store.dispatch({ type: TOGGLE_VIEW })}
        />
      ) : ''}
    </div>
  );
};

Page.propTypes = {
  state: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
      small: PropTypes.string,
      large: PropTypes.string,
      src: PropTypes.string,
      catagory: PropTypes.string
    })),
    sliderView: PropTypes.bool,
    selected: PropTypes.number,
    filters: PropTypes.arrayOf(PropTypes.string)
  })
};

const render = () => DOM.render(<Page store={store.getState()} />, document.getElementById('main'));
store.subscribe(render);
window.addEventListener('resize', () => {
  console.log(window.innerWidth);
  render();
})
render();
