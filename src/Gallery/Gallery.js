import React, { Component, PropTypes } from 'react';
// import ImageLoader from 'react-imageloader';
// import Masonry from 'react-masonry-component';
import { filter, map, compose, curry } from 'ramda';

import './gallery.css';

export default class Gallery extends Component {
  render() {
    const { images, imageFilter, handleImageClick } = this.props;
    const displayImage = (catagory) => (imageFilter === '') || (imageFilter === catagory)
    const splitByCatagory = curry((cats, imgs) =>  cats.map((catagory) => imgs.filter(img => img.catagory === catagory)));
    const splitArray = (arr) => ([arr.slice(0, arr.length / 2), arr.slice(Math.floor(arr.length / 2), arr.length)]);
    const sortImages = compose(
      map(x => splitArray(x)),
      filter(x => displayImage(x[0].catagory)),
      splitByCatagory(['fashion', 'portrait', 'travel'])
    );
    // <ImageLoader
    //   src={img.src}
    //   wrapper={React.DOM.div}
    //   preloader={() => <div style={{ width: '100%', height: '100%', background: 'grey' }}></div>}>
    //   Image load failed!
    // </ImageLoader>
    const imageComponant = (img) => (
      <div className="image-wrapper" >
        <div className="image-container" onClick={() => handleImageClick(img.$id)}>
          <img src={img.src} style={{ maxWidth: '100%' }} role="presentation" />
        </div>
      </div>
    )
    return (
      <div className="gallery-wrapper">
        {
          sortImages(images).map((catagory, index1) => (
            <div className="catagory-wrapper" key={index1 + 'catagory'}>
              {
                (index1 !== 0) && (imageFilter === '') ? <div className="title-wrapper" id={catagory[0][0].catagory + '-title'}><h1>{catagory[0][0].catagory}</h1></div> : null
              }
              <div className="images-wrapper" id={catagory[0][0].catagory + '-wrapper'}>
                {
                  catagory.map((imageColumn, index2) => (
                    <ul key={index2 + 'column'}>{ imageColumn.map((img, index3) => <li key={index3 + 'pic'}>{imageComponant(img)}</li>) }</ul>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    catagory: PropTypes.string.isRequired,
    $id: PropTypes.number.isRequired,
    loaded: PropTypes.bool.isRequired
  })).isRequired,
  imageFilter: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired
}
