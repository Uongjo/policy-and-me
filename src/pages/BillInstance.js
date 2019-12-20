import React, { Component } from 'react';
import { Link } from "react-router-dom";

class BillInstance extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      bill: {},
      interestGroups: [],
    }
  }

  async componentDidMount() {
    const response = await fetch(`https://api.policyand.me/bills?bill_id=${this.state.id}`);
    const body = await response.json();
    const bill = body[0];
    this.setState({ bill });

    const groupsResponse = await fetch(`https://api.policyand.me/sigs?state=${this.state.bill.sponsor_state}&limit=500`);
    const interestGroups = await groupsResponse.json();

    this.setState({interestGroups});
  }

  renderError = () => {
    return (<h1>Bill was not found.</h1>);
  }

  renderTable = () => {
    const {short_title, introduced_date, primary_subject, sponsor_name, committees} = this.state.bill;
    const {latest_major_action_date, congress, cosponsors, latest_major_action} = this.state.bill;
    const {number, sponsor_id, sponsor_state, summary_short} = this.state.bill;
    
    const entries = [
      ["Introduced Date", introduced_date],
      ["Primary Subject", primary_subject],
      ["Committees", committees],
      ["Sponsor", <Link to={`/legislators/${sponsor_id}`}>{sponsor_name}</Link>],
      ["Congress Number", congress],
      ["Number of Cosponsors", cosponsors],
      ["Latest major action", latest_major_action],
      ["Latest major action date", latest_major_action_date],
      ["Bill Number", number],
      ["Sponsor state", sponsor_state],
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
    const {short_title, summary_short} = this.state.bill;

    const interestGroups = this.state.interestGroups.map(group => (
      <Link to={`/interest-groups/${group.sigId}`}>
        <p>{group.name}</p>
      </Link>
    ));

    return (
      <React.Fragment>
        <h1>{short_title}</h1>
        {this.renderTable()}
        <p><b>Summary:</b> {summary_short}</p>
        <h1>Interest Groups from the same State: </h1>
        <div className="connections">
          {interestGroups}
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="bill-more-info">
        {this.state.bill !== undefined ? this.renderInstance() : this.renderError()}
        <Link to="/bills">
          <button>
            Back to Bills
          </button>
        </Link>
      </div>
    );
  }
}

export default BillInstance;