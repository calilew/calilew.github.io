import React from 'react';
import classNames from 'classnames';
import { head, uniq, prop } from 'ramda';
import { store } from './redux';

import './App.css';
import Header from './Header/Header';
import Gallery from './Gallery/Gallery';
import FullImage from './FullImage/FullImage';
import { loadNext } from './redux';

const App = ({ images, filter, selected }) => {
  const handleImageClick = (id) => store.dispatch({ type: 'SELECT_IMAGE', id });
  const handleFilterChange = (filt) => store.dispatch({ type: 'SET_FILTER', filter: filt === filter ? '' : filt });
  const handlePagenation = (amount) => {
    if (selected.id + amount >= images.length) return handleImageClick(1);
    else if (selected.id + amount < 1) return handleImageClick(images.length);
    return handleImageClick(selected.id + amount);
  }
  if (selected.id !== null) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'scroll';
  return (
    <div className="app" onClick={() => store.dispatch(loadNext())}>
      <div className={classNames('content-wrapper', { ['on-app-out']: selected.id !== null })}>
        <Header handleFilter={handleFilterChange} filter={filter} catagories={uniq(images.map(x => x.catagory))}/>
        <Gallery images={images} imageFilter={filter} handleImageClick={handleImageClick}/>
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

export default App;
