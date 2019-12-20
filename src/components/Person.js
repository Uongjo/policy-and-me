import React from 'react';

const Person = ({name, bio, responsibility, commits, issues, unitTests, image}) => {
  return (
    <div className="person">
      <h3>{name}</h3>
      <div className="headshot-wrapper">
        <img src={(image === undefined ? 'https://cdn130.picsart.com/305712853176201.jpg?c256x256' : image)}/>
      </div>
      <div className="bio">
        <p>{bio}</p>
      </div>
      <ul>
        <li>Responsibility: {responsibility}</li>
        <li>Commits: {commits}</li>
        <li>Issues: {issues}</li>
        <li>Unit tests: {unitTests}</li>
      </ul>
    </div>
  );
}
 
export default Person;

