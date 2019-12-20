import React, { Component } from 'react';
import { InterestGroups, Legislators, Bills } from './';
import { Input } from '@material-ui/core';
import { Link } from "react-router-dom";

class GlobalSearch extends Component {
  state = {  }

  constructor(props) {
    super(props);
    console.log("In here");
    const id =  props.match.params.id === undefined ? "" : props.match.params.id;
    console.log(id);
    this.state = {
      searchValue: id,
      pageIndex: 0,
    }
  }

  getSearchValue = () => {
    return this.state.searchValue.toLowerCase().split(' ').join('+');
  }

  renderButtons = () => {
    const labels = ["Bills", "Legislators", "Interest Groups"];
    const buttons = []
    for(let i = 0; i < 3; i++) {
      buttons.push(
        <button 
          onClick={() => this.setState({ pageIndex: i })} 
          className={ this.state.pageIndex === i ? "global-button current-page" : "global-button" }>
          {labels[i]}
        </button>
      );
    }
    return <div className="global-buttons">{buttons}</div>;
  }

  renderModels = () => {
    switch(this.state.pageIndex) {
      case 0 :
        return <Bills searchValue={ this.state.searchValue } globalSearch={true}/>;
      case 1:
        return <Legislators searchValue={ this.state.searchValue } globalSearch={true}/>;
      case 2:
        return <InterestGroups searchValue={ this.state.searchValue } globalSearch={true}/>;
    }
  }

  render() {
    return (
      <div className="global-search">
        {this.renderButtons()}
        <form className="splash-form">
          <input 
            className="splash-search-bar" 
            placeholder="Search..."
            value={this.state.searchValue}
            onChange={(event) => this.setState({ searchValue: event.target.value })}
          />
          <Link to={`/search/${this.getSearchValue()}`} id="global-search-btn">
            <span><i class="fas fa-search"/></span>
          </Link>
        </form>
        {/* <form className="global-search-form">
          <Input
            placeholder="Search"
            value={this.state.searchValue}
            inputProps={{
              'aria-label': 'description',
            }}
            className="global-search-input"
            onChange={(event) => this.setState({ searchValue: event.target.value })}
          />
        </form> */}
        {this.renderModels()}
      </div>
    );
  }
}

export default GlobalSearch;