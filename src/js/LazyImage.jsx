import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { imageSize } from './utils';

export default class LazyImage extends Component {
  constructor() {
    super()
    this.state = { type: 'default', src: '', width: null, height: null}
    
    this.imageLoad = this.imageLoad.bind(this);
    this.handleImageSize = this.handleImageSize.bind(this);
  }
  handleImageSize(width, height, type, src) {
    const pWidth = window.innerWidth - 50;
    const pHeight = window.innerHeight - 100;
    let newSize;
    if (pWidth < 600) {
      newSize = imageSize({ w: width, h: height }, { w: pWidth, h: pHeight })
    } else {
      newSize = imageSize({ w: width, h: height }, { w: pWidth/2, h: pHeight })
    }
    this.setState({ type, src, width: newSize.width, height: newSize.height })
  }
  imageLoad(src, type) {
    const that = this;
    let img = new Image()
    img.onload = function() {
      that.handleImageSize(this.width, this.height, type, src)
    }
    img.src = src
  }
  render() {
    const { type, src, width, height } = this.state;
    if(type === 'default') {
      this.imageLoad(this.props.src.small, 'small')
    } else if (type === 'small') {
      this.imageLoad(this.props.src.large, 'large')
    }
    return (
      <div className="image-wrapper" style={{ width: width ? width : 'auto', height: height ? height : 'auto' }}>
        <img ref="img" src={this.state.src} />
      </div>
    );
  }
}
// style={{ maxHeight: window.innerHeight -100}}
