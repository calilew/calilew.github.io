import React, { Component, PropTypes } from 'react';

class ThumbnailImage extends Component {
  componentDidMount() {
    setTimeout(() => {
      document.getElementById('img-' + this.props.id).className += ' image-visible';
    }, 0)
  }
  render() {
    const { handleImageClick, src, id } = this.props;
    return (
      <div
        className="image-container"
        onClick={() => handleImageClick(id)}
        id={'img-'+id}>
        <img src={src} role="presentation" />
      </div>
    )
  }
}

ThumbnailImage.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleImageClick: PropTypes.func.isRequired,
}

export default ThumbnailImage;
