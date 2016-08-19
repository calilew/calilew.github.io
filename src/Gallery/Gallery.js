import React, { Component, PropTypes } from 'react';
import ImageLoader from 'react-imageloader';
import { Motion, spring } from 'react-motion';
import { filter, map, compose, curry, uniq, reverse, head, prop } from 'ramda';

import './gallery.css';

export default class Gallery extends Component {
  render() {
    const { images, imageFilter, handleImageClick } = this.props;
    const displayImage = (catagory) => (imageFilter === '') || (imageFilter === catagory)
    const splitByCatagory = (array) => compose(map(cat => array.filter(x => x.catagory === cat)), uniq, map(x => x.catagory))(array);
    const splitEqual = curry((num, arr) =>
    	Array.apply(null, Array(num)).
    	map((empty, index) => arr.filter((item, itemIndex) => itemIndex % num === index)));
    const sortImages = compose(
      map(x => reverse(x)),
      map(x => splitEqual(2, x)),
      filter(x => displayImage(x[0].catagory)),
      splitByCatagory
    );
    const imageComponant = (img) => (
      <div className="image-wrapper" >
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
          {style => (
            <div className="image-container" onClick={() => handleImageClick(img.$id)} style={style}>
              <img src={img.src} role="presentation" />
            </div>
          )}
        </Motion>
      </div>
    )
    const renderStructure = (sortedArray) => {
      return sortedArray.map((catagory, index1) => {
        const title = head(head(catagory)) ? compose(prop('catagory'), head, head)(catagory) : '';
        return (
          <div className="catagory-wrapper" key={index1 + 'catagory'}>
            {
              (index1 !== 0) && (imageFilter === '') ? <div className="title-wrapper" id={title + '-title'}><h1>{title}</h1></div> : null
            }
            <div className="images-wrapper" id={title + '-wrapper'}>
              {
                catagory.map((imageColumn, index2) => (
                  <ul key={index2 + 'column'}>{ imageColumn.map((img, index3) => <li key={index3 + 'pic'}>{imageComponant(img)}</li>) }</ul>
                ))
              }
            </div>
          </div>
        )
      });
    }
    return (
      <div className="gallery-wrapper">
        { renderStructure(sortImages(images)) }
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    catagory: PropTypes.string.isRequired,
    $id: PropTypes.number.isRequired
  })).isRequired,
  imageFilter: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired
}
