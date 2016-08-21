import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import Swipeable from 'react-swipeable';
import './fullImage.css';

class FullImage extends Component {
  constructor() {
    super();
    this.state = { mousePosition: 'mouse-middle', swipeX: 0, swipeY: 0, opacity: spring(1) }
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.image.src !== nextProps.image.src) ||
      (this.state.mousePosition !== nextState.mousePosition) ||
      (this.state.swipeX !== nextState.swipeX);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.image.src !== nextProps.image.src) {
      this.setState({ swipeX: 0, swipeY: 0 });
    }
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
  handleSwipe(e, deltaX, deltaY) {
    console.log(deltaY);
    this.setState({ swipeX: deltaX, swipeY: deltaY });
  }
  render() {
    const { image, handleRightClick, handleLeftClick, handleExit } = this.props;
    const { mousePosition, swipeX, swipeY } = this.state;

    // Set cursor css style
    const wrapperStyle = () => {
      if (mousePosition === 'mouse-middle') return { cursor: 'url(../img/icons/cancel.png),auto' }
      else if (mousePosition === 'mouse-left') return { cursor: 'url(../img/icons/back.png),auto' }
      else if (mousePosition === 'mouse-right') return { cursor: 'url(../img/icons/next.png),auto' }
      return {};
    };

    return (
      <Swipeable
        onSwiping={this.handleSwipe.bind(this)}
        onSwipedUp={handleExit}
        onSwipedRight={handleLeftClick}
        onSwipedDown={handleExit}
        onSwipedLeft={handleRightClick}>
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1)}}>
          { style => (
            <div className="full-image-wrapper" style={Object.assign({}, style, wrapperStyle())} onClick={this.handleClick.bind(this)}>
              <div className="image-wrapper">
                <img src={image.src} role="presentation" style={{ position: 'relative', right: swipeX / 10, top: -swipeY / 10 }}/>
              </div>
            </div>
          )}
        </Motion>
      </Swipeable>
    );
  }
}

FullImage.propTypes = {
  image: PropTypes.shape({ src: PropTypes.string.isRequired }).isRequired,
  handleRightClick: PropTypes.func.isRequired,
  handleLeftClick: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired
}

export default FullImage;
