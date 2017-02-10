import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import R from 'ramda';
import Swipeable from 'react-swipeable';
import './lightBox.css';

class LightBox extends Component {
  constructor() {
    super();
    this.state = {
      mousePosition: 'mouse-middle',
      swipeX: 0,
      swipeY: 0,
      opacity: spring(1),
      message: true
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentDidMount() {
    // Removed scroll
    document.body.style.overflowY = 'hidden';
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  componentWillUnmount() {
    // Removed scroll
    document.body.style.overflowY = 'scroll';
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
    if (e.pageX > (window.innerWidth / 3) * 2) return this.handleRightClick();
    else if (e.pageX < window.innerWidth / 3) return this.handleLeftClick();
    return this.handleExit();
  }
  handleSwipe(e, deltaX, deltaY) {
    this.setState({ swipeX: deltaX, swipeY: deltaY });
  }
  handleRightClick() {
    const { images, router, params } = this.props;
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id.toString()), images);
    if (indexOfCurrent > images.length - 2) return router.push(`/photos/${images[0].$id}`);
    return router.push(`/photos/${images[indexOfCurrent + 1].$id}`);
  }
  handleLeftClick() {
    const { images, router, params } = this.props;
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id.toString()), images);
    if (indexOfCurrent < 1) return router.push(`/photos/${images[images.length - 1].$id}`);
    return router.push(`/photos/${images[indexOfCurrent - 1].$id}`);
  }
  handleExit () {
    const { dispatch, router, params } = this.props;
    router.push(`/`);
    // Update lastSelected property in store to reflect the current url pic id
    dispatch({ type: 'LAST_SELECTED', id: params.id });
  }
  render() {
    const { images, params } = this.props;
    const { mousePosition, swipeX, swipeY, message } = this.state;

    // Set cursor css style
    const wrapperStyle = () => {
      if (mousePosition === 'mouse-middle') return { cursor: 'url(../resources/icons/cancel.png),auto' }
      else if (mousePosition === 'mouse-left') return { cursor: 'url(../resources/icons/back.png),auto' }
      else if (mousePosition === 'mouse-right') return { cursor: 'url(../resources/icons/next.png),auto' }
      return {};
    };

    // Rertrieve current image using url id and list of images
    const currentImage = R.find(R.propEq('$id', params.id))(images)
    if (!currentImage) return <h1>NO</h1>;
    return (
      <Swipeable
        onSwiping={this.handleSwipe.bind(this)}
        onSwipedUp={this.handleExit.bind(this)}
        onSwipedRight={this.handleLeftClick.bind(this)}
        onSwipedDown={this.handleExit.bind(this)}
        onSwipedLeft={this.handleRightClick.bind(this)}>
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1)}}>
          { style => (
            <div className="full-image-wrapper" style={Object.assign({}, style, wrapperStyle())} onClick={this.handleClick.bind(this)}>
              { message && (window.innerWidth < 1000) ? <div className="message">Swipe to change</div> : null }
              <img src={currentImage.src} role="presentation" style={{ position: 'relative', right: swipeX / 10, top: -swipeY / 10 }}/>
            </div>
          )}
        </Motion>
      </Swipeable>
    );
  }
}

LightBox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string.isRequired })).isRequired,
  lastSelected: PropTypes.string.isRequired,
};

const mapStateToProps = ({ images, lastSelected }) => ({ images, lastSelected });

export default connect(mapStateToProps)(LightBox);
