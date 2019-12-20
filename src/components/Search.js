import React, { Component } from 'react';
import { TextField, FormControl, InputLabel, Select } from '@material-ui/core';

class Search extends Component {
  state = {  }

  constructor(props) {
    super(props);
    this.state = {
      sortValue: "",
      searchValue: "",
      filterKey: "",
      filterValue: "",
    }
  }

  handleSearch = async () => {
    // this.props.setNoResults(0);
    const searchValue = this.state.searchValue.toLowerCase().split(' ').join('+');
    const sortValue = this.state.sortValue.toLowerCase().split(' ').join('+');
    const url = `https://api.policyand.me/${this.props.model}?limit=500&search=${searchValue}&sort=${sortValue}`;
    console.log(url);
    const response =  await fetch(url);
    const body = await response.json();
    this.props.setModel(body);
    // if (body.length === 0) {
    //   this.props.setNoResults(1);
    // }
    this.props.setSearchValue(this.state.searchValue);
    this.props.setFilterKey(this.state.filterKey);
    this.props.setFilterValue(this.state.filterValue);
    this.props.setPageIndex(0);
  }

  getSortOptions = () => {
    const sortOptions = Object.keys(this.props.sortOptions);
    return sortOptions.map(key => (
      <option value={key}>{this.props.sortOptions[key]}</option>
    ));
  }

  getFilterOptions = () => {
    const filterOptions = Object.keys(this.props.filterOptions);
    return filterOptions.map(key => (
      <option value={key}>{this.props.filterOptions[key]}</option>
    ));
  }

  render() { 
    return (
      <div className="search">
        <FormControl>
          <TextField
            id="standard-basic"
            label="Search"
            margin="normal"
            onChange={(event) => this.setState({ searchValue: event.target.value })}
          />
        </FormControl>
        <FormControl className="sort">
          <InputLabel htmlFor="age-native-simple">Sort By</InputLabel>
          <Select
            native
            value={this.state.sortValue}
            onChange={(event) => this.setState({ sortValue: event.target.value })}
          >
            <option value=""></option>
            {this.getSortOptions()}
          </Select>
        </FormControl>
        <FormControl className="filter-select">
          <InputLabel htmlFor="age-native-simple">Filter By</InputLabel>
          <Select
            native
            value={this.state.filterKey}
            onChange={(event) => this.setState({ filterKey: event.target.value })}
          >
            <option value=""></option>
            {this.getFilterOptions()}
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            id="standard-basic"
            label="Filter Value"
            margin="normal"
            onChange={(event) => this.setState({ filterValue: event.target.value })}
          />
        </FormControl>
        <button onClick={() => this.handleSearch()}>
          Search
        </button>
      </div>
    );
  }
}
 
export default Search;
