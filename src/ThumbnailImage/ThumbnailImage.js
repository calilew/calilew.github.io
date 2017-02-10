import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class ThumbnailImage extends Component {
  componentDidMount() {
    const { animateIn } = this.props;
    if (animateIn) {
      setTimeout(() => {
        document.getElementById('img-' + this.props.id).className += ' image-visible';
      }, 0)
    }
  }
  render() {
    const { handleImageClick, src, id, animateIn } = this.props;
    return (
      <div
        className={classNames('image-container', { ['image-visible']: !animateIn })}
        onClick={() => handleImageClick(id)}
        id={'img-'+id}>
        <img src={src} role="presentation" />
      </div>
    )
  }
}

ThumbnailImage.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired,
}

export default ThumbnailImage;
