import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { head, uniq } from 'ramda';
import { store } from './redux';

import './App.css';
import Header from './Header/Header';
import Gallery from './Gallery/Gallery';
import FullImage from './FullImage/FullImage';

const App = ({ images, selected }) => {
  // Actions
  const handleImageClick = (id) => store.dispatch({ type: 'SELECT_IMAGE', id });

  // Handle next or previus image select
  const handlePagenation = (amount) => {
    if (selected.id + amount >= images.length) return handleImageClick(1);
    else if (selected.id + amount < 1) return handleImageClick(images.length);
    return handleImageClick(selected.id + amount);
  }

  // No scroll while Full image view;
  if (selected.id !== null) document.body.style.overflowY = 'hidden';
  else document.body.style.overflowY = 'scroll';

  return (
    <div className="app">
      <div className={classNames('content-wrapper', { ['on-app-out']: selected.id !== null })}>
        <Header
          catagories={uniq(images.map(x => x.catagory))}/>
        <Gallery
          images={images}
          handleImageClick={handleImageClick}/>
      </div>
      {
        selected.id !== null ? (
          <FullImage
            image={head(images.filter(m => m.$id === selected.id))}
            handleExit={() => handleImageClick(null)}
            handleLeftClick={() => handlePagenation(-1)}
            handleRightClick={() => handlePagenation(1)}
          />
        ) : null
      }
    </div>
  )
}

App.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string.isRequired }).isRequired).isRequired,
  selected: PropTypes.object.isRequired
};

export default App;
