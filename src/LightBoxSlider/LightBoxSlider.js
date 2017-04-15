import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import R from 'ramda';
// onTouchCancel onTouchEnd onTouchMove onTouchStart

export default class LightBoxSlider extends Component {
  constructor() {
    super();
    this.state = {
      hasSwitched: true,
      touchDownX: 0,
      touchOffset: 0,
      movingLeft: true,
      mousePosition: 'mouse-middle',
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  componentDidMount() {
    // blocked scroll
    document.body.style.overflowY = 'hidden';
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  componentWillUnmount() {
    // unblocked scroll
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
  componentWillReceiveProps(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.setState({ hasSwitched: true, touchDownX: 0, touchOffset: 0 });
    }
  }
  handleClick(e) {
    if (e.pageX > (window.innerWidth / 3) * 2) return this.handleRightSwitch();
    else if (e.pageX < window.innerWidth / 3) return this.handleLeftSwitch();
    return this.handleExit();
  }
  handleTouchStart(e) {
    this.setState({ hasSwitched: false, touchDownX: e.touches[0].pageX });
  }
  handleTouchEnd(e) {
    const { router, images, params } = this.props
    const { touchOffset } = this.state;
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id), images);
    let offset = 0;
    if (touchOffset > window.innerWidth / 3) {
      offset = window.innerWidth;
      this.handleLeftSwitch(400);
    }
    if (touchOffset < -window.innerWidth / 3) {
      offset = -window.innerWidth;
      this.handleRightSwitch(400);
    }
    this.setState({ touchDownX: 0, touchOffset: offset });
  }
  handleTouchMove(e) {
    const { touchDownX } = this.state;
    this.setState({ touchOffset: e.touches[0].pageX - touchDownX, movingLeft: (e.touches[0].pageX - touchDownX) < 0 });
  }
  handleRightSwitch(delay = 0) {
    const { images, router, params } = this.props;
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id.toString()), images);
    if (indexOfCurrent > images.length - 2) return setTimeout(router.push(`/photos/${images[0].$id}`), delay);
    return setTimeout(() => router.push(`/photos/${images[indexOfCurrent + 1].$id}`), delay);
  }
  handleLeftSwitch(delay = 0) {
    const { images, router, params } = this.props;
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id.toString()), images);
    if (indexOfCurrent < 1) return setTimeout(router.push(`/photos/${images[images.length - 1].$id}`), delay);
    return setTimeout(() => router.push(`/photos/${images[indexOfCurrent - 1].$id}`), delay);
  }
  handleExit() {
    const { dispatch, router, params } = this.props;
    router.push(`/`);
    // Update lastSelected property in store to reflect the current url pic id
    dispatch({ type: 'LAST_SELECTED', id: params.id });
  }
  render() {
    const { params, images } = this.props;
    const { mousePosition, hasSwitched, touchOffset, movingLeft } = this.state;
    // Index in images array of current image
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id), images);
    // Three Currently visible image ids
    const visible = {
      left: indexOfCurrent === 0 ? images[images.length - 1] : images[indexOfCurrent - 1],
      center: images[indexOfCurrent],
      right: indexOfCurrent > (images.length - 2) ? images[0] : images[indexOfCurrent + 1]
    }
    const screenRatio = window.innerWidth / window.innerHeight;
    // Set cursor css style
    const wrapperStyle = () => {
      if (mousePosition === 'mouse-middle') return { cursor: 'url(resources/icons/cancel.png),auto' }
      else if (mousePosition === 'mouse-left') return { cursor: 'url(resources/icons/back.png),auto' }
      else if (mousePosition === 'mouse-right') return { cursor: 'url(resources/icons/next.png),auto' }
      return {};
    };
    return (
      <div style={wrapperStyle()} onClick={this.handleClick.bind(this)}>
        <Motion defaultStyle={{ leftOffset: 0 }} style={{ leftOffset: hasSwitched ? 0 : spring(Math.abs(touchOffset), { stiffness: 180, damping: 25 }) }}>
          {({ leftOffset }) => (
            <div>
              {
                /* HIDDEN LEFT IMAGE */
                <div
                  className="fixed flex items-center justify-center"
                  style={{ width: '100vw', height: '100vh', top: 0, left: movingLeft ? -window.innerWidth - leftOffset : -window.innerWidth + leftOffset, }}>
                  <img
                    src={visible.left.src}
                    style={{ maxHeight: '100vh', maxWidth: '100%', }} />
                </div>
              }
              {/* MAIN IMAGE */}
              <div
                onTouchStart={this.handleTouchStart.bind(this)}
                onTouchEnd={this.handleTouchEnd.bind(this)}
                onTouchMove={this.handleTouchMove.bind(this)}
                className="fixed flex items-center justify-center"
                style={{ width: '100vw', height: '100vh', top: 0, left: movingLeft ? -leftOffset : leftOffset  }}>
                <img
                  src={visible.center.src}
                  style={{
                    maxHeight: '100vh',
                    maxWidth: '100%',
                  }} />
              </div>
              {
                /* HIDDEN RIGHT IMAGE */
                <div
                  className="fixed flex items-center justify-center"
                  style={{ width: '100vw', height: '100vh', top: 0, left: movingLeft ? window.innerWidth + -leftOffset : window.innerWidth + leftOffset }}>
                  <img
                    src={visible.right.src}
                    style={{ maxHeight: '100vh', maxWidth: '100%', }} />
                </div>
              }
            </div>
          )}
        </Motion>
      </div>
    );
  }
};

LightBoxSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string.isRequired })).isRequired,
  lastSelected: PropTypes.string.isRequired,
};

const mapStateToProps = ({ images, lastSelected }) => ({ images, lastSelected });

export default connect(mapStateToProps)(LightBoxSlider);
