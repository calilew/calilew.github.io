import React, { PropTypes } from 'react';

import './header.css';

const Header = ({ handleFilter, filter }) => {
  const underlineClass = () => {
    if (filter === '') return 'all-three';
    else if (filter === 'fashion') return 'left';
    else if (filter === 'portrait') return 'middle';
    else return 'right';
  };
  return (
    <div className="header-wrapper">
      <h1 className="showing">Cali Lew</h1>
      <div className="hidden-text">
        <p className="about about-showing">
          A couple of sentances describing cali in the third person. It should outline unique talents and encorage people to get in contact through her email bellow.
          <a className="email" href="mailto:enquiries@cali-lew.com?subject=hello">enquiries@cali-lew.com</a>
        </p>
      </div>
      <div className="nav-wrapper">
        <div className="nav-container">
          <div onClick={() => handleFilter('fashion')}>Fashion</div>
          <div onClick={() => handleFilter('portrait')}>Portrait</div>
          <div onClick={() => handleFilter('travel')}>Travel</div>
        </div>
        <div className={'underline ' + underlineClass(filter)}></div>
      </div>
    </div>
  );
};

Header.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired
};

export default Header;
