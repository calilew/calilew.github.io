import reducer, { ADD_IMAGE } from './redux/reducer';

export const imageLinks = () => {
  const buildArray = (num, catagory) => {
    const iter = (acc, arr) => {
      if(acc === num + 1) return arr;
      return iter(acc + 1, [].concat(arr, [{
        small: 'dist/img/' + catagory + '/' + acc + '.jpg',
        large: 'dist/img/' + catagory + '/' + 'large/' + acc + '.jpg'
      }]))
    }
    return iter(1, [])
  }
  return [].concat(buildArray(18, 'fashion'), buildArray(17, 'portrait'), buildArray(23, 'travel'))
}

export const imageSize = (ratio, width, height) => {
  if(height / ratio < width) {
    return { width: height / ratio, height }
  }
  return { width, height: width * ratio }
}

export const aSynceImageLoad = (array, store) => {
  const loadImage = (img, size) => {
    let newImg = new Image();
    newImg.onload = function() {
      store.dispatch({
        type: ADD_IMAGE,
        data: Object.assign({}, img, {
          ratio: this.height / this.width,
          src: img[size]
        })
      })
      if(size === 'small') {
        return setTimeout(() => loadImage(img, 'large'), 500)
      }
    }
    newImg.src = img[size]
  }
  const recurseLoad = (images) => {
    if(images.length < 1) return 'done'
    else {
      loadImage(images[0], 'small')
      return setTimeout(() => recurseLoad(images.slice(1, images.length)), 200)
    }
  }
  return recurseLoad(array)
}
