import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import highlightSearch from './HighlightSearch'

const InterestGroup = ({ interestGroup, searchValue }) => {
  // name, address, city, phone, email, 
  return (
    <div className="interest-group">
      <Card>
        <h2>&nbsp;&nbsp;{interestGroup.name}</h2>
        <ul>
          <li>Address: {interestGroup.address}</li>
          <li>City: {interestGroup.city}</li>
          <li>Phone: {interestGroup.phone1}</li>
          <li>Email: {interestGroup.email}</li>
        </ul>
        {searchValue === "" ? "" : highlightSearch(interestGroup, searchValue)}
      </Card>
    </div>
  );
}
 
export default InterestGroup;