import React, { PropTypes } from 'react';
import { scrollTo } from '../scroller';

import './header.css';

const Header = ({ catagories }) => {
  const handleNavClick = (filt) => {
    const bodyRect = document.body.getBoundingClientRect();
    catagories.forEach((cat, index) => {
      if (filt === cat) {
        if (index === 0) return scrollTo(document.getElementById(cat + '-wrapper').getBoundingClientRect().top - bodyRect.top + 100, () => null);
        return scrollTo(document.getElementById(cat + '-title').getBoundingClientRect().top - bodyRect.top, () => null);
      }
    });
  }
  return (
    <div className="header-wrapper">
      <div className="fixed">
        <p className="name" onClick={() => scrollTo(0, () => null)}>Cali &nbsp;Lew</p>
        <div className="nav">
          <ul>
            {
              catagories.map((cat, index) => <li key={index} onClick={() => handleNavClick(cat)}>{cat}</li>)
            }
          </ul>
        </div>
      </div>
      <div className="about">
        <p className="short"><b>Hi my name is Cali. I am a london based photographer currently freelancing.</b></p>
        <ul>
          <li id="email"><a href="mailto:enquiries@cali-lew.com?Subject=Hello">email</a></li>
          <li id="instagram"><a href="https://www.instagram.com/calilew">instagram</a></li>
        </ul>
      </div>
    </div>
  );
}


Header.propTypes = {
  catagories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Header;
