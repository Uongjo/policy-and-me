import React, { Component } from 'react';
import * as d3 from 'd3';

class DoctorBarChart extends Component {
  state = {  }

  constructor(props) {
    super(props);
    const data = []

    this.state = {
      data: data,
    }
  }

  async componentDidMount() {

    //get data from doctorsearch api
    var stateData = []
    for (var i = 1; i<7; i++) {
      const url = 'https://api.doctorsearch.me/api/city?page='+i;
      console.log(url);
      const response = await fetch(url);
      var apiData = response.json().then(apiDataJson => {
        for (var j = 0; j < apiDataJson["objects"].length; j++){
              var tempObject = {name: apiDataJson["objects"][j]["name"], value: apiDataJson["objects"][j]["num_specialties"]}
              stateData.push(tempObject)
        }
      })
    }
    this.setState({data:stateData})
    

    const data = this.state.data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 165
    };

    var width = 960 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    var svg = d3.select("#doctor-Spec-Graphic").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var y = d3.scaleBand()
        .rangeRound([0, height])
        .padding(0.1)
        .domain(data.map(function (d) {
            return d.name;
        }));

    //make y axis to show bar names
    var yAxis = d3.axisLeft(y)
        .scale(y)
        //no tick marks
        .tickSize(0)
        // .orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.name) + y.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d.value) + 3;
        })
        .text(function (d) {
            return d.value;
        });
  }

  render() { 
    return (
      <div className="doctor-visualization-bar-chart">
        <div id="doctor-Spec-Graphic"></div>
      </div>
    );
  }
}
 
export default DoctorBarChart;