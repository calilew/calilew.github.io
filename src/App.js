import React, { Component } from 'react';
import './App.css';

import Header from './Header';
import Gallery from './Gallery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // images: assemble(getImages()),
      filter: '',
      selected: null
    }
  }
  handleImageClick(id) { return this.setState({ selected: id }) }
  render() {
    const { filter } = this.state;
    const { images } = this.props;
    return (
      <div className="App">
        <Header handleFilter={(filt) => this.setState({ filter: filt === filter ? '' : filt })} filter={filter} />
        <Gallery images={images} imageFilter={filter} handleImageClick={this.handleImageClick.bind(this)}/>
      </div>
    );
  }
}

export default App;
