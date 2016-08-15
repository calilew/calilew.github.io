import React, { Component } from 'react';
import { assemble } from 'schematizr';
import './App.css';

import Header from './Header';
import Gallery from './Gallery';

const getImages = () => {
  const buildArray = (num, catagory) => {
    const iter = (acc, arr) => {
      if (acc === num + 1) return arr;
      return iter(acc + 1, [].concat(arr, [{
        src: 'img/' + catagory + '/' + 'large/' + acc + '.jpg',
        catagory
      }]));
    };
    return iter(1, []);
  };
  // return [].concat(buildArray(3, 'fashion'), buildArray(3, 'portrait'), buildArray(3, 'travel'));
  return [].concat(buildArray(18, 'fashion'), buildArray(17, 'portrait'), buildArray(23, 'travel'));
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: assemble(getImages()),
      filter: '',
      selected: null
    }
  }
  handleImageClick(id) { return this.setState({ selected: id }) }
  render() {
    const { images, filter } = this.state;
    console.log(images, filter);
    return (
      <div className="App">
        <Header handleFilter={(filter) => this.setState({ filter })} filter={filter} />
        <Gallery images={images} filter={filter} handleImageClick={this.handleImageClick.bind(this)}/>
      </div>
    );
  }
}

export default App;
