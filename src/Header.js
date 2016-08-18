import React, { PropTypes } from 'react';

import './header.css';

const Header = ({ handleFilter, filter }) => {
  const underlineClass = () => {
    if (filter === '') return 'all';
    else if (filter === 'fashion') return 'left';
    else if (filter === 'portrait') return 'middle';
    else if (filter === 'travel') return 'right';
    return 'all'
  };
  const nav = () => (
    <div className="nav-wrapper">
      <div className="nav-container">
        <div onClick={() => handleFilter('fashion')}>Fashion</div>
        <div onClick={() => handleFilter('portrait')}>Portrait</div>
        <div onClick={() => handleFilter('travel')}>Travel</div>
      </div>
      <div className={'underline ' + underlineClass(filter)}></div>
    </div>
  );
  return (
    <div className="header-wrapper">
      <div className="fixed">
        <h1 className="name">Cali Lew</h1>
        <div className="nav"><ul><li>portraits</li><li>fashion</li><li>travel</li></ul></div>
      </div>
      <p className="about"><b>Hi my name is Cali. I am a london based photographer currently traveling the world</b></p>
    </div>
  );
};

Header.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired
};

export default Header;
