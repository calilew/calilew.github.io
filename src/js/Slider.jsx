import React, { Component } from 'react';
import { TransitionMotion, Motion, spring } from 'react-motion';
import { imageSize } from './utils';

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: props.image,
      style: { opacity: spring(1) }
    }

    this.handleRightClick = this.handleRightClick.bind(this);
  }
  handleRightClick() {
    this.props.handleSelect(this.props.selected - 1)
  }
  componentWillReceiveProps(props) {
    this.setState({ style: { opacity: spring(1) } })
    this.setState({ image: props.image })
  }
  handleArrowClick(amount = 0) {
    this.setState({ style: { opacity: spring(0) } })
    this.props.handleSelect(this.props.selected - amount)
  }
  render() {
    const { image, selected, toggleView, handleSelect } = this.props
    const imageStyle = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if( width < 500) {
        return imageSize(image.ratio, window.innerWidth-60, window.innerHeight-10)
      }
      return imageSize(image.ratio, window.innerWidth-200, window.innerHeight-100)
    }
    return (
      <div className='slider-wrapper'>
        <div className='btn x-btn' onClick={() => toggleView()}>
          <img src='dist/img/x-btn.png'></img>
        </div>
        <div className='btn arr larr-btn'
          onClick={() => handleSelect(selected - 1)}><img src='dist/img/larr-btn.png'></img></div>

        <Motion
          defaultStyle={{ opacity: 0 }}
          style={this.state.style}>
          { (style) => {
            return (
              <div
                className='image-slide-container'
                style={Object.assign({}, imageStyle(), style)}>
                <img src={image.src} style={imageStyle()} />
              </div>
            )}
          }
        </Motion>

        <div
          className='btn arr rarr-btn'
          onClick={() => this.handleRightClick()}><img src='dist/img/rarr-btn.png'></img></div>
      </div>
    )
  }
}
