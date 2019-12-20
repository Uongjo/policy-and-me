import React from 'react';
import { Card } from '@material-ui/core';
import highlightSearch from './HighlightSearch'

const Bill = ({bill, searchValue}) => {
  // short_title, introduced_date, primary_subject, sponsor_name, committees
  return (
    <div className="bill">
      <Card>
        <h2>{bill.short_title}</h2>
        <ul>
          <li>Introduced Date: {bill.introduced_date}</li>
          <li>Primary Subject: {bill.primary_subject}</li>
          <li>Sponsor: {bill.sponsor_name}</li>
          <li>Committees: {bill.committees}</li>
        </ul>
        {searchValue === "" ? "" : highlightSearch(bill, searchValue)}
      </Card>
    </div>
  );
}
 
export default Bill;