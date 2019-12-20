import React, { Component } from 'react';
import loadingGIF from '../static/loading.gif';

class Loading extends Component {
  state = {  }
  render() { 
    return (
      <div className="loading-gif-container">
        <img className="loading-gif" src={loadingGIF}/>
      </div>
    );
  }
}
 
export default Loading;