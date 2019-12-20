import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Input } from '@material-ui/core';


class Splash extends Component {
  state = {  }

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    }
  }

  getSearchValue = () => {
    return this.state.searchValue.toLowerCase().split(' ').join('+');
  }

  render() { 
    return (
      <div id="splash"> 
        <div className="content">
          <h1>POLICY AND ME</h1>
          <h3>Where policy and people meet</h3>
          <div className="call-to-action">
            <form className="splash-form">
              <input 
                className="splash-search-bar" 
                placeholder="Search..."
                onChange={(event) => this.setState({ searchValue: event.target.value })}
              />
              <Link to={`/search/${this.getSearchValue()}`}>
                <span><i class="fas fa-search"/></span>
                </Link>
            </form>
          </div>
        </div>
      </div>

    );
  }
}
 
export default Splash;