import React, { Component } from 'react';
import { InterestGroup, Pagination, Search, Loading } from '../components';
import { Link } from "react-router-dom";

class InterestGroups extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      interestGroups: ["LOADING"],
      pageIndex: 0,
      numGroups: 0,
      searchValue: this.props.searchValue,
      filterKey: "",
      filterValue: "",
      numPerPage: 40,
    }
  }

  async componentDidMount(){
    if(this.props.searchValue !== undefined) {
      this.handleGlobalSearch();
    } else {
      const url = 'https://api.policyand.me/sigs?limit=400';
      const response = await fetch(url);
      const interestGroups = await response.json();
      this.setState({ interestGroups })
    }
    if(this.props.globalSearch) {
      document.getElementById("global-search-btn").addEventListener("click", this.handleGlobalSearch);
    }
  }

  componentWillUnmount() {
    if(this.props.globalSearch)
      document.getElementById("global-search-btn").removeEventListener('click', this.handleGlobalSearch, false);
  }

  handleGlobalSearch = async () => {
    const searchValue = this.props.searchValue.toLowerCase().split(' ').join('+');
    const url = `https://api.policyand.me/sigs?limit=400&search=${searchValue}`;
    const response =  await fetch(url);
    const body = await response.json();
    this.setState({ interestGroups: body });
    this.setState({ pageIndex: 0 });
    this.setState({ searchValue: this.props.searchValue });
  }

  renderPage = () => {
    if(this.state.interestGroups.length === 1 && this.state.interestGroups[0] === "LOADING") {
      return <Loading/>;
    }
    let interestGroups = this.state.interestGroups
    if(this.state.filterValue !== "" && this.state.filterKey !== "") {
      interestGroups = interestGroups.filter(interestGroup => (
        interestGroup[this.state.filterKey] === this.state.filterValue
      ));
    }
    if(interestGroups.length !== this.state.numGroups)
        this.setState({ numGroups: interestGroups.length});
    if(interestGroups.length === 0)
      return <h1 align="center">No results found</h1>;

    const renderedGroups = [...interestGroups].splice(
      this.state.pageIndex * this.state.numPerPage, 
      this.state.numPerPage
    );
    const result = renderedGroups.map((group) => (
      <Link
        to={`/interest-groups/${ group.sigId }`}
        className="link"
        key={ group.sigId }
      >
        <InterestGroup interestGroup={group} searchValue = {this.state.searchValue}/>
      </Link>
    ));
    return <div className="interest-groups-grid">{result}</div>;
  }

  setPageIndex = (pageIndex) => {
    this.setState({ pageIndex });
  }

  setSearchValue = (searchValue) => {
    this.setState({ searchValue });
  }

  setGroups = (interestGroups) => {
    this.setState({interestGroups});
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
          setModel={this.setGroups}
          model="sigs"
          setSearchValue={this.setSearchValue}
          sortOptions={ { name: "Name" } }
          filterOptions={ { state: "State" } }
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
      <div id="interest-groups">
        {this.renderSearch()}
        <Pagination 
          setPageIndex={this.setPageIndex} 
          numPages={this.state.numGroups / this.state.numPerPage}
          pageIndex={this.state.pageIndex}
        />
        {/* { this.state.interestGroups.length === 0 && this.state.noresults === 0 ? <Loading/> : this.state.noresults === 1 ? <h1 align="center">No results found</h1> : this.renderPage() } */}
        {this.renderPage()}
        <Pagination
          setPageIndex={this.setPageIndex} 
          numPages={this.state.numGroups / this.state.numPerPage}
          pageIndex={this.state.pageIndex}
        />
      </div>
    );
  }
}

InterestGroups.defaultProps = {
  searchValue: "",
  globalSearch: false,
}
 
export default InterestGroups;