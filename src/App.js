import React, { PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';

import Header from './Header/Header';
import Gallery from './Gallery/Gallery';

import './App.css';

const App = ({ images, lastSelected, router }) => {
  // Actions
  const handleImageClick = (id) => router.push(`photos/${id}`);
  // Filter images that havent loaded yet

  const loadedImages = images.filter(x => x.loaded);
  return (
    <div className="app">
      <div className="content-wrapper">
        <Header
          catagories={R.uniq(loadedImages.map(x => x.catagory))}/>
        <Gallery
          images={loadedImages}
          handleImageClick={handleImageClick}
          lastSelected={lastSelected}/>
      </div>
    </div>
  )
}

App.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string.isRequired })).isRequired,
  lastSelected: PropTypes.string.isRequired,
};

const mapStateToProps = ({ images, lastSelected }) => ({ images, lastSelected });

export default connect(mapStateToProps)(App);
