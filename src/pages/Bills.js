import React, { Component } from 'react';
import { Bill, Pagination, Search, Loading } from '../components';
import { Link } from "react-router-dom";

class Bills extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      bills: ["LOADING"],
      pageIndex: 0,
      numBills: 0,
      searchValue: this.props.searchValue,
      filterKey: "",
      filterValue: "",
      numPerPage: 50,
    }
  }

  async componentDidMount() {
    if(this.props.searchValue !== undefined) {
      this.handleGlobalSearch();
    } else {
      const url = 'https://api.policyand.me/bills?limit=500';
      const response = await fetch(url);
      const bills = await response.json();
      this.setState({ bills });
    }
    if(this.props.globalSearch)
      document.getElementById("global-search-btn").addEventListener("click", this.handleGlobalSearch);
  }

  componentWillUnmount() {
    if(this.props.globalSearch)
      document.getElementById("global-search-btn").removeEventListener('click', this.handleGlobalSearch, false);
  }

  handleGlobalSearch = async () => {
    console.log("IN HERE");
    const searchValue = this.props.searchValue.toLowerCase().split(' ').join('+');
    const url = `https://api.policyand.me/bills?limit=500&search=${searchValue}`;
    console.log(url);
    const response =  await fetch(url);
    const body = await response.json();
    this.setState({ bills: body });
    this.setState({ pageIndex: 0 });
    this.setState({ searchValue: this.props.searchValue });
  }

  renderPage = () => {
    if(this.state.bills.length === 1 && this.state.bills[0] === "LOADING") {
      return <Loading/>;
    }
    let bills = this.state.bills;
    if(this.state.filterValue !== "" && this.state.filterKey !== "") {
      bills = bills.filter(bill => (
        bill[this.state.filterKey] === this.state.filterValue
      ));
    }

    if(bills.length !== this.state.numBills)
        this.setState({ numBills: bills.length});
    if(bills.length === 0)
      return <h1 align="center">No results found</h1>;

    const renderedBills = [...bills].splice(this.state.pageIndex * this.state.numPerPage, this.state.numPerPage);
    const result = renderedBills.map((bill) => (
      <Link
        to={`/bills/${ bill.bill_id }`}
        className="link"
        key={ bill.bill_id }
      >
        <Bill bill = {bill} searchValue = {this.state.searchValue}/>
      </Link>
    ));
    return <div className="bill-grid">{result}</div>;
  }

  setPageIndex = (pageIndex) => {
    this.setState({ pageIndex });
  }

  setSearchValue = (searchValue) => {
    this.setState({ searchValue });
  }

  setBills = (bills) => {
    this.setState({bills});
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
          setModel={this.setBills}
          model="bills"
          setSearchValue={this.setSearchValue}
          sortOptions={ { short_title: "Title", sponsor_name: "Sponsor Name"} }
          filterOptions={ {sponsor_party: "Sponsor Party", sponsor_state: "Sponsor State" } }
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
      // );
    }
  }

  render() {
    return (
      <div id="bills">
        {this.renderSearch()}
        <Pagination 
          setPageIndex={this.setPageIndex} 
          numPages={this.state.numBills / this.state.numPerPage}
          pageIndex={this.state.pageIndex}
        />
        {this.renderPage()}
        <Pagination 
          setPageIndex={this.setPageIndex}
          numPages={this.state.numBills / this.state.numPerPage}
          pageIndex={this.state.pageIndex}
        />
      </div>
    );
  }
}

Bills.defaultProps = {
  searchValue: "",
  globalSearch: false,
}


export default Bills;
