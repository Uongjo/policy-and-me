import React, { Component } from 'react';
import { Link } from "react-router-dom";
import default_picture from "../static/default_avatar.png"

class LegislatorInstance extends Component {

  state = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      legislator: {},
      billsSponsored: [],
      interestGroups: [],
    }
  }

  async componentDidMount() {
    const response = await fetch(`https://api.policyand.me/legislators?id=${this.state.id}`);
    const body = await response.json();
    const legislator = body[0];

    this.setState({ legislator });

    const billsResponse = await fetch(`https://api.policyand.me/bills?sponsor_id=${this.state.id}&limit=500`);
    const billsSponsored = await billsResponse.json();

    const groupsResponse = await fetch(`https://api.policyand.me/sigs?state=${this.state.legislator.state}&limit=500`);
    const interestGroups = await groupsResponse.json();

    this.setState({ billsSponsored, interestGroups });
  }

  renderError = () => {
    return (<h1>Legislator not found.</h1>);
  }

  renderTable = () => {

    const {first_name, last_name, title, party, state, gender, date_of_birth} = this.state.legislator;
    const {missed_votes_pct, seniority, facebook_account, youtube_account, twitter_account} = this.state.legislator;
    const {votes_with_party_pct, url, votesmart_id} = this.state.legislator;

    const entries = [
      ["Title",title],
      ["Party",party],
      ["State",state],
      ["Gender",gender],
      ["Date of Birth",date_of_birth],
      ["Missed Votes Percentage",missed_votes_pct],
      ["Votes with Party Percentage",votes_with_party_pct],
      ["Seniority",seniority],
      ["Facebook",facebook_account],
      ["Youtube Account",youtube_account],
      ["Twitter", <a href = {"https://twitter.com/".concat(twitter_account)} target="_blank">{twitter_account}</a>],
      ["Website", <a href = {url} target="_blank">{url}</a>],
    ];

    const rows = entries.map(entry => (
      <tr key={entry[0]}>
        <td>{entry[0]}</td>
        <td>{entry[1]}</td>
      </tr>
    ));

    return (
      <table className="table">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  renderInstance = () => {
    const {first_name, last_name, title, party, state, gender, date_of_birth} = this.state.legislator;
    const {missed_votes_pct, seniority, facebook_account, youtube_account, twitter_account} = this.state.legislator;
    const {votes_with_party_pct, url, votesmart_id} = this.state.legislator;
    const image = votesmart_id != 0 ? "https://static.votesmart.org/canphoto/".concat(votesmart_id).concat(".jpg") : default_picture;

    const bills = this.state.billsSponsored.map(bill => (
      <Link to={`/bills/${bill.bill_id}`}>
        <p>{bill.title}</p>
      </Link>
    ));
  
    const interestGroups = this.state.interestGroups.map(group => (
      <Link to={`/interest-groups/${group.sigId}`}>
        <p>{group.name}</p>
      </Link>
    ));
  
    return (
      <React.Fragment>
        <h1>{first_name + " " + last_name}</h1>

        <img src={(image)} alt = 'No Picture'/>
        {this.renderTable()}
        <h1>Sponsored Bills: </h1>
        <div className="connections">{bills}</div>
        <h1>Interest Groups from the same State: </h1>
        <div className="connections">{interestGroups}</div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="legislator-more-info">
        {this.state.legislator !== undefined ? this.renderInstance() : this.renderError()}
        <Link to="/legislators">
          <button>
            Back to Legislators
          </button>
        </Link>
      </div>
    );
  }
}
 
export default LegislatorInstance;