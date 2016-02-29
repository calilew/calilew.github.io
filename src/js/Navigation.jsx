import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { imageSize } from './utils';

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      fashion: false,
      portrait: false,
      travel: false
    };
  }
  render() {
    const { images, handleSelect } = this.props;
    const { fashion, portrait, travel } = this.state;
    const style = (img) => {
      if (window.innerWidth < 600) {
        return imageSize(img.ratio, window.innerWidth - 20, window.innerHeight - 20);
      }
      return imageSize(img.ratio, (window.innerWidth - 100) / 4, window.innerHeight / 2 - 100);
    };
    return (
      <div className="navigation-wrapper">
        <div className={fashion ? 'genre open' : 'genre'}>

          <div className="title" onClick={() => this.setState({ fashion: !fashion })}>Fashion</div>
          <div className="photos">
          {
            images.filter(img => img.catagory === 'fashion').map((img, index) => (
                <Motion
                  defaultStyle={{ opacity: 0 }}
                  style={{ opacity: spring(1, { stiffness: 90, damping: 60 }) }}
                  key={index}>
                  {(styles) => {
                    const newStyle = Object.assign({}, style(img), { opacity: styles.opacity });
                    return (
                      <div
                        className="image-wrapper"
                        style={newStyle}>
                        <img src={img.small} onClick={() => handleSelect(img._id)} />
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
        <div className={portrait ? 'genre open' : 'genre'}>
          <div className="title"
            onClick={() => this.setState({ portrait: !portrait })}>
            Portrait
          </div>
          <div className="photos">
          {
            images.filter(img => img.catagory === 'portrait').map((img, index) => (
                <Motion
                  defaultStyle={{ opacity: 0 }}
                  style={{ opacity: spring(1, { stiffness: 90, damping: 60 }) }}
                  key={index}>
                  {(styles) => {
                    const newStyle = Object.assign({}, style(img), { opacity: styles.opacity });
                    return (
                      <div
                        className="image-wrapper"
                        style={newStyle}>
                        <img src={img.small} onClick={() => handleSelect(img._id)} />
                        <div
                          className="outline"
                          style={Object.assign({}, style(img), {
                            top: -style(img).height - 25, left: - 25
                          })}></div>
                      </div>
                    );
                  }}
                </Motion>
              )
            )
          }
          </div>

        </div>
        <div className={travel ? 'genre open' : 'genre'}>

          <div className="title" onClick={() => this.setState({ travel: !travel })}>Travel</div>
          <div className="photos">
          {
            images.filter(img => img.catagory === 'travel').map((img, index) => (
                <Motion
                  defaultStyle={{ opacity: 0 }}
                  style={{ opacity: spring(1, { stiffness: 90, damping: 60 }) }}
                  key={index}>
                  {(styles) => {
                    const newStyle = Object.assign({}, style(img), { opacity: styles.opacity });
                    return (
                      <div
                        className="image-wrapper"
                        style={newStyle}>
                        <img src={img.small} onClick={() => handleSelect(img._id)} />
                        <div className="outline" style={Object.assign({}, style(img), {
                            top: -style(img).height - 25, left: - 25
                        })}></div>
                      </div>
                    );
                  }}
                </Motion>
              )
            )
          }
          </div>

        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    small: PropTypes.string,
    large: PropTypes.string,
    src: PropTypes.string,
    catagory: PropTypes.string
  })),
  handleSelect: PropTypes.func.isRequired
};
