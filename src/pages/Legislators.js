import React, { Component } from 'react';
import LegislatorInstance from './LegislatorInstance';
import { Legislator, Pagination, Search, Loading } from '../components'
import { Link } from "react-router-dom";

class Legislators extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      legislators: ["LOADING"],
      pageIndex: 0,
      numLegislators: 0,
      searchValue: this.props.searchValue,
      filterKey: "",
      filterValue: "",
      numPerPage: 60,
    }
  }

  async componentDidMount(){
    if(this.props.searchValue !== undefined) {
      this.handleGlobalSearch();
    } else {
      const url = 'https://api.policyand.me/legislators?limit=600';
      const response = await fetch(url);
      const legislators = await response.json();
      this.setState({ legislators })
    }
    if(this.props.globalSearch)
      document.getElementById("global-search-btn").addEventListener("click", this.handleGlobalSearch);
  }
  
  componentWillUnmount() {
    if(this.props.globalSearch)
      document.getElementById("global-search-btn").removeEventListener('click', this.handleGlobalSearch, false);
  }

  handleGlobalSearch = async () => {
    const searchValue = this.props.searchValue.toLowerCase().split(' ').join('+');
    const url = `https://api.policyand.me/legislators?limit=600&search=${searchValue}`;
    const response =  await fetch(url);
    const body = await response.json();
    this.setState({ legislators: body });
    this.setState({ pageIndex: 0 });
    this.setState({ searchValue: this.props.searchValue });
  }

  renderPage = () => {
    if(this.state.legislators.length === 1 && this.state.legislators[0] === "LOADING") {
      return <Loading/>;
    }
    let legislators = this.state.legislators;
    if(this.state.filterValue !== "" && this.state.filterKey !== "") {
      legislators = legislators.filter(legislator => (
        legislator[this.state.filterKey] === this.state.filterValue
      ));
    }
    if(legislators.length !== this.state.numLegislators)
      this.setState({ numLegislators: legislators.length});

    if(legislators.length === 0)
      return <h1 align="center">No results found</h1>;

    const renderedLegislators = [...legislators].splice(this.state.pageIndex * this.state.numPerPage, this.state.numPerPage);
    const result = renderedLegislators.map((legislator, index) => (
      <Link
        to={`/legislators/${ legislator.id }`}
        className="link"
        key={ legislator.id }
      >
        <Legislator legislator={legislator} searchValue={this.state.searchValue} />
      </Link>
    ));
    return <div className="legislator-grid">{result}</div>
  }

  setPageIndex = (pageIndex) => {
    this.setState({ pageIndex });
  }

  setSearchValue = (searchValue) => {
    this.setState({ searchValue });
  }

  setLegislators = (legislators) => {
    this.setState({legislators});
  }

  setFilterValue = (filterValue) => {
    this.setState({filterValue});
  }

  setFilterKey = (filterKey) => {
    this.setState({filterKey});
  }
  
  getSearchValue = () => {
    return this.props.searchValue.toLowerCase().split(' ').join('+');
  }

  renderSearch = () => {
    if(!this.props.globalSearch) {
      return (
        <Search
          setModel={this.setLegislators}
          model="legislators"
          setSearchValue={this.setSearchValue}
          sortOptions={ {first_name: "First Name", last_name: "Last Name"} }
          filterOptions={ {party: "Party", state: "State" } }
          setFilterKey={this.setFilterKey}
          setFilterValue={this.setFilterValue}
          setPageIndex={this.setPageIndex}
        />
      );
    } else {
      // return (
      //   <Link to={`/search/${this.getSearchValue()}`}>
      //     <button onClick={() => this.handleGlobalSearch() } className="global-button">
      //       Search
      //     </button>
      //   </Link>
      // )
    }
  }

  render() {
    return (
      <div id="legislators">
        {this.renderSearch()}
        <Pagination 
          setPageIndex={this.setPageIndex} 
          numPages={this.state.numLegislators / this.state.numPerPage}
          pageIndex={this.state.pageIndex}
        />
        {/* { this.state.legislators.length === 0 && this.state.noresults === 0 ? <Loading/> : this.state.noresults === 1 ? <h1 align="center">No results found</h1>: this.renderPage() } */}
        {this.renderPage()}
        <Pagination 
          setPageIndex={this.setPageIndex} 
          numPages={this.state.numLegislators / this.state.numPerPage}
          pageIndex={this.state.pageIndex}
        />
      </div>
    );
  }
}

Legislators.defaultProps = {
  searchValue: "",
  globalSearch: false,
}
 
export default Legislators;