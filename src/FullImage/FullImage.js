import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import './fullImage.css';

class FullImage extends Component {
  constructor() {
    super();
    this.state = { mousePosition: 'mouse-middle' }
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseMove(e) {
    const { mousePosition } = this.state;
    if (e.pageX > (window.innerWidth / 3) * 2 && mousePosition !== 'mouse-right') {
      return this.setState({ mousePosition: 'mouse-right' });
    } else if (e.pageX < window.innerWidth / 3 && mousePosition !== 'mouse-left') {
      return this.setState({ mousePosition: 'mouse-left' });
    } else if (e.pageX > window.innerWidth / 3 && e.pageX < (window.innerWidth / 3) * 2 && mousePosition !== 'mouse-middle') {
      return this.setState({ mousePosition: 'mouse-middle' });
    }
  }
  handleClick(e) {
    const { handleRightClick, handleLeftClick, handleExit } = this.props;
    if (e.pageX > (window.innerWidth / 3) * 2) return handleRightClick();
    else if (e.pageX < window.innerWidth / 3) return handleLeftClick();
    return handleExit();
  }
  render() {
    const { image } = this.props;
    const { mousePosition } = this.state;
    const wrapperStyle = () => {
      if (mousePosition === 'mouse-middle') return { cursor: 'url(../img/icons/cancel.png),auto' }
      else if (mousePosition === 'mouse-left') return { cursor: 'url(../img/icons/back.png),auto' }
      else if (mousePosition === 'mouse-right') return { cursor: 'url(../img/icons/next.png),auto' }
      return {};
    }
    return (
      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1)}}>
        { style => (
          <div className="full-image-wrapper" style={Object.assign({}, style, wrapperStyle())} onClick={this.handleClick.bind(this)}>
            <div className="image-wrapper"><img src={image.src} role="presentation" /></div>
          </div>
        )}
      </Motion>
    );
  }
}

export default FullImage;
