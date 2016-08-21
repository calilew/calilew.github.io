import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import { imageSize } from './utils';

const Gallery = ({ images, handleSelect, filters }) => {
  const style = (img) => {
    if (window.innerWidth < 750) {
      return imageSize(img.ratio, window.innerWidth - 20, window.innerHeight - 20);
    } else if (window.innerWidth < 1000) {
      return imageSize(img.ratio, window.innerWidth*0.7/2 - 30, window.innerHeight - 20);
    }
    return imageSize(img.ratio, (window.innerWidth*0.5) / 3 - 30, window.innerHeight - 100);
  };
  return (
    <div className="gallery-wrapper">
      <div className="section-wrapper">
        { images.map((img, index) => (
              <Motion
                defaultStyle={{ opacity: 0, marginTop: 500 }}
                style={{
                  opacity: spring(1, { stiffness: 90, damping: 60 }),
                  marginTop: spring(0)
                }}
                key={index}>
                {(styles) => {
                  const newStyle = Object.assign({}, style(img), {
                    opacity: styles.opacity
                  });
                  const classes = () => {
                    if (filters.length < 1) return 'image-wrapper';
                    else if (filters.filter(genre => genre === img.catagory).length > 0) {
                      return 'image-wrapper';
                    }
                    return 'image-wrapper filtered';
                  };
                  return (
                    <div
                      className={classes()}
                      style={newStyle}>
                      <img src={img.src} onClick={() => handleSelect(img._id)} />
                      <div
                        className="outline"
                        style={Object.assign({}, style(img), {
                          top: -style(img).height - 25, left: - 25
                        })}>
                      </div>
                    </div>
                  );
                }}
              </Motion>
            )
          )
        }
      </div>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    small: PropTypes.string,
    large: PropTypes.string,
    src: PropTypes.string,
    catagory: PropTypes.string
  })),
  handleSelect: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string)
};

export default Gallery;
