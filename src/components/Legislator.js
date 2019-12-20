import React from 'react';
import { Card } from '@material-ui/core';
import default_picture from '../static/default_avatar.png';
import highlightSearch from './HighlightSearch'

const Legislator = ({ legislator, searchValue }) => {
  // first_name, last_name, title, party, gender, state

  const image = legislator.votesmart_id != 0 ? 
    `https://static.votesmart.org/canphoto/${legislator.votesmart_id}.jpg`: 
    default_picture;

  return (
    <div className="legislator">
      <Card>
          <h2 align="center">{legislator.first_name + ' ' + legislator.last_name}</h2>
          <div align="center">
            <img src={image} alt = 'No picture'/>
          </div>
          <ul>
            <li>Title: {legislator.title}</li>
            <li>Party: {legislator.party}</li>
            <li>State: {legislator.state}</li>
            <li>Gender: {legislator.gender}</li>
          </ul>
          {searchValue === "" ? "" : highlightSearch(legislator, searchValue)}
      </Card>
    </div>
  );
}
 
export default Legislator;