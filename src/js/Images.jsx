import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Motion, spring, presets } from 'react-motion';

import LazyImage from './LazyImage';
import { imageSize } from './utils';

export default ({ images, handleSelect }) => {
  const style = (img) => {
    if(window.innerWidth < 600) {
      return imageSize(img.ratio, window.innerWidth-20, window.innerHeight-20);
    }
    return imageSize(img.ratio, (window.innerWidth - 100)/2, window.innerHeight - 100);
  }
  return (
    <div className="gallery-wrapper">
      <div className='section-wrapper'>
        { images.map((img, index) => {
            return (
              <Motion defaultStyle={{ opacity: 0, marginTop: 500 }} style={{ opacity: spring(1, {stiffness: 90, damping: 60}), marginTop: spring(0) }} key={index}>
                {(styles) => {
                  const newStyle = Object.assign({}, style(img), {
                    opacity: styles.opacity,
                    marginTop: styles.marginTop
                  })
                  return (
                    <div
                      className="image-wrapper"
                      style={newStyle}>
                      <img src={img.src} onClick={() => handleSelect(img._id)}/>
                      <div className="outline" style={Object.assign({}, style(img), { top: -style(img).height - 25, left: - 25 })}></div>
                    </div>
                  )
                }}
              </Motion>
            )
          })
        }
      </div>
    </div>
  )
}
