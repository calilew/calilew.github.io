var Page = React.createClass({
  render: function(){
    return(
      <div className="page-wrapper">
        <Header  />
        <ImageGallery fashionImages={this.props.fashionImages} portraitImages={this.props.portraitImages} travelImages={this.props.travelImages}/>
        <Footer />
      </div>
    )
  }
});
var Header = React.createClass({
  render: function(){
    return (
      <div className="header">
        <div>
          <h1>CALI<span className="logo">LEW</span></h1>
          <p>I am a London based photographer currently in Melbourne
          if you like my work or want to chat drop me an email
          <br/><a href="mailto:prettyponies888@hotmail.com?subject=hello">prettyponies888@hotmail</a></p>
        </div>
      </div>
    )
  }
});
var ImageGallery = React.createClass({
  getInitialState: function(){
    return {selectedGenre: this.props.fashionImages,selectedThumb: 0}
  },
  handleGenre: function(e){
    if(e.target.id == 1){
      this.setState({selectedGenre: this.props.fashionImages})
    }else if(e.target.id == 2){
      this.setState({selectedGenre: this.props.portraitImages})
    }else if(e.target.id == 3){
      this.setState({selectedGenre: this.props.travelImages})
    }
    this.setState({selectedThumb: 0});
  },
  handleSelect: function(e){
    this.setState({selectedThumb: e.target.id});
  },
  render: function(){
    var that = this;
    var imageList = this.state.selectedGenre.map(function(url, i){
      return <img src={url} onClick={that.handleSelect} className="image-thumb" id={i} />
    });
    var imageLarge = this.state.selectedGenre[this.state.selectedThumb];
    return (
      <div>
        <div className="nav-bar">
          <div><h2 id={1} onClick={this.handleGenre}>Fashion</h2></div>
          <div><h2 id={2} onClick={this.handleGenre}>Portraits</h2></div>
          <div><h2 id={3} onClick={this.handleGenre}>Travel</h2></div>
        </div>
        <div className="gallery-wrapper">
          <div className="gallery-scroll">
            {imageList}
          </div>
          <div ref="gl" className="gallery-large">
            <img className="image-large" src={imageLarge} />
          </div>
        </div>
      </div>
    )
  }
});

var Footer = React.createClass({
  render: function(){
    return (
      <div className="footer">
      </div>
    )
  }
});

React.render(<Page fashionImages={fashionImages} portraitImages={portraitImages} travelImages={travelImages}/>,document.getElementById('main'));

function pageReload(){
  React.render(<Page fashionImages={fashionImages} portraitImages={portraitImages} travelImages={travelImages}/>,document.getElementById('main'));
}
