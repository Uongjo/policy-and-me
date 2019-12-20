import React, { Component } from 'react';
import * as d3 from 'd3';

class VisualizationBubbleChart extends Component {
  state = {  }

  constructor(props) {
    super(props);
    const data = {"children": [
      {"Name": "death" , "Count": 14},
      {"Name": "birth" , "Count": 8},
      {"Name": "war" , "Count": 109},
      {"Name": "abortion" , "Count": 13},
      {"Name": "gun" , "Count": 25},
      {"Name": "peace" , "Count": 5},
      {"Name": "rights" , "Count": 76},
      {"Name": "drug" , "Count": 67},
      {"Name": "tax" , "Count": 164},
      {"Name": "wage" , "Count": 48},
      {"Name": "military" , "Count": 51},
      {"Name": "marine" , "Count": 5},
      {"Name": "climate" , "Count": 22},
      {"Name": "job" , "Count": 9},
      {"Name": "health" , "Count": 154},
      {"Name": "economy" , "Count": 10},
      {"Name": "amendment" , "Count": 241},
      {"Name": "science" , "Count": 8},
      {"Name": "immigrants" , "Count": 4},
      {"Name": "energy" , "Count": 27},
      {"Name": "technology" , "Count": 26},
      {"Name": "human" , "Count": 26},
      {"Name": "transportation" , "Count": 31},
    ]}
    this.state = {
      data: data,
    }
  }

  componentDidMount() {

    const dataset = this.state.data;

    var diameter = 1200;
    var color = d3.scaleOrdinal()
        .range(["#87cefa", "#86c6ef", "#85bde4", "#83b7d9", "#82afce", "#80a6c2", "#7e9fb8", "#7995aa", "#758b9e", "#708090"]);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select(".visualization-bubble-chart")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
        .sum(function(d) { return d.Count; });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.data.Name + ": " + d.data.Count;
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Count;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    d3.select(window.self.frameElement)
        .style("height", diameter + "px");
  }
  render() { 
    return (
      <div className="visualization-bubble-chart">
      </div>
    );
  }
}
 
export default VisualizationBubbleChart;

