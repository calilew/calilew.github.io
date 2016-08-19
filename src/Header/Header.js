import React, { PropTypes } from 'react';

import './header.css';

const Header = ({ handleFilter, filter }) => {
  return (
    <div className="header-wrapper">
      <div className="fixed">
        <p className="name">Cali &nbsp;Lew</p>
        <div className="nav">
          <ul>
            <li onClick={() => handleFilter('fashion')}>fashion</li>
            <li onClick={() => handleFilter('portrait')}>portrait</li>
            <li onClick={() => handleFilter('travel')}>travel</li>
          </ul>
        </div>
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
