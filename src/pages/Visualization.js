import React, { Component } from 'react';
import { 
  VisualizationMap, 
  VisualizationBarChart,
  VisualizationBubbleChart,
  DoctorMap,
  DoctorCityRating,
  DoctorBarChart,
} from '../components';

class Visualization extends Component {
  state = {  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // this.getCounts();
  }

  getCounts = async () => {
    const words = [
      "death",
      "birth",
      "war",
      "abortion",
      "gun",
      "peace",
      "rights",
      "drug",
      "tax",
      "wage",
      "military",
      "marine",
      "climate",
      "job",
      "health",
      "economy",
      "amendment",
      "science",
      "immigrants",
      "energy",
      "technology",
      "rights",
      "human",
      "transportation",
    ];
    
    const wordMap = new Map();
    words.forEach(word => {
      wordMap.set(word, 0);
    })

    const url = 'https://api.policyand.me/bills?limit=500';
    const response = await fetch(url);
    const bills = await response.json();
    const keys = Object.keys(bills[0]);
    bills.forEach(bill => {
      keys.forEach(key => {
        words.forEach(word => {
          const body = bill[key];
          const matching = new RegExp(word, 'g');
          console.log(matching);
          const count = (body.match(matching) || []).length;
          wordMap.set(word, wordMap.get(word) + count);
        })
      });
    });
    console.log(wordMap);
  }

  render() { 
    return (
      <div className="visualization">
        <h1>Frequencies of Keywords in Bills</h1>
        <VisualizationBubbleChart/>
        <h1>Interest Groups by State</h1>
        <VisualizationMap/>
        <h1>Number of Sponsored Bills by Legislator</h1>
        <VisualizationBarChart/>
        <h1>________________________________________________</h1>
        <h1>Number of Doctors by State</h1>
        <DoctorMap/>
        <h1>Average Doctor Rating by City</h1>
        <DoctorCityRating/>
        <h1>Number of specialties per city</h1>
        <DoctorBarChart/>
      </div>
    );
  }
}
 
export default Visualization;