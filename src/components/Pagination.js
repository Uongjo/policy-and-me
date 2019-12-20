import React, { Component } from 'react';

class Pagination extends Component {

  renderPagination = () => {
    const buttons = Array.from({length: this.props.numPages}, (v, k) => k); 
    return buttons.map((value, index) => (
      <button 
        onClick={() => { this.props.setPageIndex(value); window.scrollTo(0, 0); }} 
        key={index}
        className={this.props.pageIndex === value ? "current-page" : "" }
      >
        {value + 1}
      </button>
    ));
  }

  render() { 
    return (
      <div className="pagination">
        {this.renderPagination()}
      </div>
    );
  }
}

export default Pagination;