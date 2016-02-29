import React, { PropTypes } from 'react';

const underlineClass = (filters) => {
  if (filters.length === 0 || filters.length === 3) return 'all-three';
  else if (filters.length === 1) {
    if (filters[0] === 'fashion') {
      return 'left';
    } else if (filters[0] === 'portrait') return 'middle';
    return 'right';
  } else if (filters.filter(filt => filt === 'fashion' || filt === 'portrait').length === 2) {
    return 'left-two';
  } else if (filters.filter(filt => filt === 'fashion' || filt === 'travel').length === 2) {
    return 'outer-two';
  } else if (filters.filter(filt => filt === 'portrait' || filt === 'travel').length === 2) {
    return 'right-two';
  }
  return '';
};

const Header = ({ handleFilters, filters }) => (
  <div className="header-wrapper">
    <h1 className="showing">Cali Lew</h1>
    <div className="hidden-text">
      <p className="about about-showing">
        A couple of sentances describing cali in the third person. It should outline unique talents and encorage people to get in contact through her email bellow.
        <a className="email" href="mailto:enquiries@cali-lew.com?subject=hello">
          enquiries@cali-lew.com
        </a>
      </p>
    </div>
    <div className={'nav-wrapper'}>
      <div className="nav-container">
        <div onClick={handleFilters}>Fashion</div>
        <div onClick={handleFilters}>Portrait</div>
        <div onClick={handleFilters}>Travel</div>
      </div>
      <div className={'underline ' + underlineClass(filters)}></div>
    </div>
  </div>
);

Header.propTypes = {
  handleFilters: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string)
};

export default Header;
