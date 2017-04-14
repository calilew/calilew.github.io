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
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.setState({ hasSwitched: true, touchDownX: 0, touchOffset: 0 });
    }
  }
  handleTouchStart(e) {
    this.setState({ hasSwitched: false, touchDownX: e.touches[0].pageX });
  }
  handleTouchEnd(e) {
    const { router, images, params } = this.props
    const { touchOffset } = this.state;
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id), images);
    let offset = 0;
    // if (touchOffset < 0) { offset = -0.001 }
    // if (touchOffset > 0) { offset = 0.001 }
    if (touchOffset > window.innerWidth / 3) {
      offset = window.innerWidth;
      setTimeout(() => {
        if (indexOfCurrent < 1) return router.push(`/photos/${images[images.length - 1].$id}`);
        return router.push(`/photos/${images[indexOfCurrent - 1].$id}`);
      }, 300)
    }
    if (touchOffset < -window.innerWidth / 3) {
      offset = -window.innerWidth;
      setTimeout(() => {
        if (indexOfCurrent > images.length - 1) return router.push(`/photos/${images[0].$id}`);
        return router.push(`/photos/${images[indexOfCurrent + 1].$id}`);
      }, 300)
    }
    this.setState({ touchDownX: 0, touchOffset: offset });
  }
  handleTouchMove(e) {
    const { touchDownX } = this.state;
    this.setState({ touchOffset: e.touches[0].pageX - touchDownX, movingLeft: (e.touches[0].pageX - touchDownX) < 0 });
  }
  handleRest() {
    console.log('rest');
  }
  render() {
    const { params, images } = this.props;
    const { hasSwitched, touchOffset, movingLeft } = this.state;
    // Index in images array of current image
    const indexOfCurrent = R.findIndex(R.propEq('$id', params.id), images);
    // Three Currently visible image ids
    const visible = {
      left: indexOfCurrent === 0 ? images[images.length - 1] : images[indexOfCurrent - 1],
      center: images[indexOfCurrent],
      right: indexOfCurrent > (images.length - 2) ? images[0] : images[indexOfCurrent + 1]
    }
    const screenRatio = window.innerWidth / window.innerHeight;
    // console.log(indexOfCurrent, visible);
    console.log('touch offset', touchOffset);
    return (
      <div style={{ overflow: 'hidden' }}>
        <Motion defaultStyle={{ leftOffset: 0 }} style={{ leftOffset: hasSwitched ? 0 : spring(Math.abs(touchOffset)) }}>
          {({ leftOffset }) => (
            <div style={{ overflow: 'hidden' }}>
              {console.log('anim', movingLeft, leftOffset)}
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
