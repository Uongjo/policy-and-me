import React, { Component } from 'react';
import { Link } from "react-router-dom";

class InterestGroupInstance extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      interestGroup: {},
      legislators: [],
      bills: [],
    }
  }

  async componentDidMount() {
    const response = await fetch(`https://api.policyand.me/sigs?sig_id=${this.state.id}`);
    const body = await response.json();
    const interestGroup = body[0];
    this.setState({ interestGroup });

    const legislatorsResponse = await fetch(`https://api.policyand.me/legislators?state=${this.state.interestGroup.state}&limit=500`); 
    const legislators = await legislatorsResponse.json();
    this.setState({ legislators });

    const billsResponse = await fetch(`https://api.policyand.me/bills?state=${this.state.interestGroup.state}&limit=500`);
    const bills = await billsResponse.json();
    this.setState({ bills });
  }

  renderError = () => {
    return (<h1>Interest Group not found.</h1>);
  }

  renderTable = () => {
    const { address, city, phone1, email, state, zip, fax, url } = this.state.interestGroup;
    
    const entries = [
      ["Address", address],
      ["City", city],
      ["State", state],
      ["Email", <a href={'mailto:' + email} target="_blank">{email}</a>],
      ["Phone", phone1],
      ["Zip Code", zip],
      ["Fax", fax],
      ["Website", <a href={url} target="_blank">{url}</a>],
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
    const {name, description} = this.state.interestGroup;

    const legislators = this.state.legislators.map(legislator => (
      <Link to={`/legislators/${legislator.id}`}>
        <p>{legislator.first_name + ' ' + legislator.last_name}</p>
      </Link>
    ));

    const bills = this.state.bills.map(bill => (
      <Link to={`/bills/${bill.bill_id}`}>
        <p>{bill.title}</p>
      </Link>
    ));

    return (
      <React.Fragment>
        <h1>{name}</h1>
        {this.renderTable()}
        <p><b>Description:</b> {description}</p>
        <h1>Legislators from the same State</h1>
        <div className="connections">
          {legislators}
        </div>
        <h1>Bills from the same State</h1>
        <div className="connections">
          {bills}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="interest-group-more-info">
        {this.state.interestGroup !== undefined ? this.renderInstance() : this.renderError()}
        <Link to="/interest-groups">
          <button className="instance-button">
            Back to Interest Groups
          </button>
        </Link>
      </div>
    );
  }
}

export default InterestGroupInstance;