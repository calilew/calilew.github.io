import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';

import './gallery.css';

export default class Gallery extends Component {
  render() {
    const { images, filter, handleImageClick } = this.props;
    const elements = images.filter(img => filter === '' ? true : img.catagory === filter).map(img => (
      <li onClick={() => handleImageClick(img.$id)} key={img.$id}>
        <img src={img.src} role="presentation"/>
      </li>
    ));
    return (
      <div className="gallery-wrapper">
        <Masonry elementType={'ul'}>{elements}</Masonry>
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    catagory: PropTypes.string.isRequired,
    $id: PropTypes.number.isRequired
  })).isRequired,
  filter: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired
}
