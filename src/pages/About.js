import React, { Component } from 'react';
import { Person } from '../components';
import JoelHeadshot from '../static/joel_headshot.PNG';
import AtharvaHeadshot from '../static/atharva_headshot.jpg';
import AbhishekHeadshot from '../static/abhishek_headshot.jpg';
import AlecHeadshot from '../static/alec_headshot.png';
import MalcolmHeadshot from '../static/malcolm_headshot.PNG';

// PRIVATE-TOKEN: jP_jyJZK_jqeKDAo5o2v
// project-ID: 14523181

class About extends Component {
	state = {  }

  constructor(props) {
    super(props);
    this.state = {
      commitMap: new Map(),
      issueMap: new Map(),
      numCommits: 0,
      numIssues: 0,
    }
  }

  async getCommits() {
    const response = await fetch('https://gitlab.com/api/v4/projects/14523181/repository/contributors');
    const commits = await response.json();
    const commitMap = new Map();
    let numCommits = 0;
    commits.forEach(element => {
      const name = element.name;
      numCommits += element.commits;
      commitMap.set(name, element.commits);
    });
    this.setState({commitMap, numCommits});
  }

  async getIssues() {
    const response = await fetch('https://gitlab.com/api/v4/projects/14523181/issues?per_page=100');
    const issues = await response.json();
    this.setState({ numIssues: issues.length });
    const issueMap = new Map();
    issues.forEach(element => {
      const name = element.author.name;
      if(!issueMap.has(name))
        issueMap.set(name, 0);
      issueMap.set(name, issueMap.get(name) + 1);
    });
    this.setState({issueMap});
  }
  
  componentDidMount() {
    this.getCommits();
    this.getIssues();
  }

  renderPeople = () => {

    const commitMap = this.state.commitMap;
    const issueMap = this.state.issueMap;

    const TeamMember = class {
      constructor(name, responsibility, commits, issues, unitTests, image, bio) {
        this.name = name;
        this.responsibility = responsibility;
        this.commits = commits;
        this.issues = issues;
        this.unitTests = unitTests;
        this.image = image;
        this.bio = bio
      }
    }

    const bios = [
      "Hi, my name is Abhishek! I'm from Dallas and my favorite food is the quesarito from Taco Bell.", // Abhishek
      "Hello! My name is Alec and I enjoy long walks on the beach.", // Alec
      "I’m a CS junior with an interest in theory and quant finance. When I’m free I like playing pool and listening to music.", // Atharva
      "Hey! I'm Joel, a third year CS major, and I enjoy hiking.", // Joel
      "Hello, I am a senior computer science major with an interest in front end development, and I like to go bouldering", // Malcolm
    ]

    const abhishek = new TeamMember(
      'Abhishek Dayal', 
      'AWS Connection, Database',
      commitMap.get("Abhishek Dayal"),
      issueMap.get("abhishekdayal"),
      10,
      AbhishekHeadshot,
      bios[0],
    );

    const alec = new TeamMember(
      'Alec Sweet', 
      'Back-End, Database',
      commitMap.get("Alec Sweet"),
      issueMap.get("Alec Sweet"),
      30,
      AlecHeadshot,
      bios[1],
    );

    const atharva = new TeamMember(
      'Atharva Pendse', 
      'AWS setup(Domain/SSL), Database',
      commitMap.get("Atharva Pendse"),
      issueMap.get("Atharva Pendse"),
      0,
      AtharvaHeadshot,
      bios[2],
    );
    
    const joel = new TeamMember(
      'Joel Uong', 
      'Front-End',
      commitMap.get("Uongjo"),
      issueMap.get("Joel Uong"),
      0,
      JoelHeadshot,
      bios[3],
    );
    
    const malcolm = new TeamMember(
      'Malcolm Hess', 
      'Front-End',
      commitMap.get("Malcolm Hess"),
      issueMap.get("Malcolm Hess"),
      46,
      MalcolmHeadshot,
      bios[4],
    );

    const members = [abhishek, alec, atharva, joel, malcolm];

    return members.map((member, index) => (
      <Person
        key={member.name}
        name={member.name}
        bio={member.bio}
        responsibility={member.responsibility}
        commits={member.commits}
        issues={member.issues}
        unitTests={member.unitTests}
        image={member.image}
      />
    ));
  }
  
	render() { 
		return (
      <div id="about">
        <div className="members">
          {this.renderPeople()}
        </div>
        <div className="info">
          <h1>Stats</h1>
          <p><b>Total commits:</b> {this.state.numCommits}</p>
          <p><b>Total issues:</b> {this.state.numIssues}</p>
          <p><b>Total unit tests:</b> 86</p>
          <p><a href="https://documenter.getpostman.com/view/8970979/SVzua1tY" target="_blank">API documentation</a></p>
          <h1>Tools Used</h1>
          <p><b>Front End:</b> React, Sass, Material-UI</p>
          <p><b>Back End:</b> AWS, Flask, SQLAlchemy</p>
          <p><b>Other:</b> Postman, GitLab, D3</p>
        </div>
      </div>
		);
	}
}
 
export default About;