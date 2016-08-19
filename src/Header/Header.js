import React, { PropTypes } from 'react';
import { position, scrollTo } from '../scroller';

import './header.css';

const Header = ({ handleFilter, filter }) => {
  const handleNavClick = (filt) => {
    const bodyRect = document.body.getBoundingClientRect();
    if (filt === 'fashion') {
      return scrollTo(document.getElementById('fashion-wrapper').getBoundingClientRect().top - bodyRect.top + 100, () => null);
    }
    if (filt === 'portrait') {
      return scrollTo(document.getElementById('portrait-title').getBoundingClientRect().top - bodyRect.top, () => null);
    }
    if (filt === 'travel') {
      return scrollTo(document.getElementById('travel-title').getBoundingClientRect().top - bodyRect.top, () => null);
    }
  }
  return (
    <div className="header-wrapper">
      <div className="fixed">
        <p className="name" onClick={() => scrollTo(0, () => null)}>Cali &nbsp;Lew</p>
        <div className="nav">
          <ul>
            <li onClick={() => handleNavClick('fashion')}>fashion</li>
            <li onClick={() => handleNavClick('portrait')}>portrait</li>
            <li onClick={() => handleNavClick('travel')}>travel</li>
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
