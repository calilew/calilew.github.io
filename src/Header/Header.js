import React, { Component, PropTypes } from 'react';
import { scrollTo } from '../scroller';

import './header.css';

class Header extends Component {
  shouldComponentUpdate(nextProps) { return this.props.catagories.length !== nextProps.catagories.length; }
  render() {
    const { catagories } = this.props;
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
        <p className="about"><b>Hi my name is Cali. I am a london based photographer currently traveling the world</b></p>
      </div>
    );
  }
}


Header.propTypes = {
  catagories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Header;
