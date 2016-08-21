import React, { Component, PropTypes } from 'react';
import { map, compose, curry, uniq, reverse, head, prop } from 'ramda';
import ThumbnailImage from '../ThumbnailImage/ThumbnailImage';
import './gallery.css';

export default class Gallery extends Component {
  render() {
    const { images, handleImageClick } = this.props;

    // Splits array into seperate arrays of catagories
    const splitByCatagory = (array) => compose(
      map(cat => array.filter(x => x.catagory === cat)),
      uniq,
      map(x => x.catagory))(array);

    // Splits array in half by deviding into even and odd spots
    const splitEqual = curry((num, arr) =>
    	Array.apply(null, Array(num))
    	.map((empty, index) => arr.filter((item, itemIndex) => itemIndex % num === index)));

    // Splits array in half by dividing it in the middle
    const splitMiddle = (arr) => [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2, arr.length)]
    const sortImages = compose(
      map(x => window.innerWidth <= 700 ? x : reverse(x)),
      map(x => window.innerWidth <= 700 ? splitMiddle(x) : splitEqual(2, x)),
      splitByCatagory
    );

    // Thumbnail image component
    const imageComponant = (img) => (
      <div className="image-wrapper" >
        <ThumbnailImage src={img.src} id={img.$id} handleImageClick={handleImageClick} />
      </div>
    );
    
    const renderStructure = (sortedArray) => {
      return sortedArray.map((catagory, index1) => {
        const title = head(head(catagory)) ? compose(prop('catagory'), head, head)(catagory) : '';
        return (
          <div className="catagory-wrapper" key={index1 + 'catagory'}>
            {
              (index1 !== 0) ? <div className="title-wrapper" id={title + '-title'}><h1>{title}</h1></div> : null
            }
            <div className="images-wrapper" id={title + '-wrapper'}>
              {
                catagory.map((imageColumn, index2) => (
                  <ul key={index2 + 'column'}>
                    {
                      imageColumn.map((img, index3) => (
                        <li key={index3 + 'pic'}>
                          {imageComponant(img)}
                        </li>
                      ))
                    }
                  </ul>
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
  handleImageClick: PropTypes.func.isRequired
}
