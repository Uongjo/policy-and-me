import React, { Component } from 'react';
import * as d3 from 'd3';

class DoctorCityRating extends Component {
  state = {  }

  constructor(props) {
    super(props);
    const data = [
        {city:'Southaven', value: 3.5},
    {city:'Royal Oak', value: 4.25},
    {city:'Tucson', value: 4.5},
    {city:'Harvey', value: 4.0},
    {city:'Cleveland', value: 3.5},
    {city:'New Lenox', value: 3.5},
    {city:'San Diego', value: 4.33},
    {city:'Westfield', value: 4.5},
    {city:'Shenandoah', value: 5.0},
    {city:'Pittsburgh', value: 5.0},
    {city:'Seattle', value: 4.75},
    {city:'Franklin', value: 3.5},
    {city:'Albuquerque', value: 4.17},
    {city:'Chevy Chase', value: 4.5},
    {city:'Saint Petersburg', value: 4.0},
    {city:'Charlotte', value: 4.33},
    {city:'Fort Worth', value: 4.33},
    {city:'Boston', value: 4.0},
    {city:'Nashville', value: 4.1},
    {city:'Memphis', value: 4.25},
    {city:'El Paso', value: 4.3},
    {city:'Las Vegas', value: 3.92},
    {city:'Austin', value: 4.5},
    {city:'McKinney', value: 5.0},
    {city:'Edina', value: 4.5},
    {city:'Chicago', value: 4.5},
    {city:'Hialeah', value: 4.0},
    {city:'Colorado Springs', value: 4.64},
    {city:'Milwaukee', value: 4.5},
    {city:'Temple Terrace', value: 4.0},
    {city:'Southfield', value: 3.75},
    {city:'Huntersville', value: 4.5},
    {city:'Louisville', value: 4.19},
    {city:'Miami', value: 4.07},
    {city:'Santa Monica', value: 4.0},
    {city:'Avon', value: 4.0},
    {city:'Los Angeles', value: 4.0},
    {city:'Atlanta', value: 4.25},
    {city:'Alexandria', value: 3.5},
    {city:'Arlington', value: 4.63},
    {city:'Jacksonville', value: 4.5},
    {city:'Dearborn', value: 3.5},
    {city:'Shepherdsville', value: 4.0},
    {city:'Metairie', value: 4.0},
    {city:'Houston', value: 4.75},
    {city:'Excelsior Springs', value: 4.0},
    {city:'Issaquah', value: 4.5},
    {city:'Baltimore', value: 4.0},
    {city:'Paterson', value: 3.5},
    {city:'Lumberton', value: 3.5},
    {city:'New York', value: 4.0},
    {city:'North Richland Hills', value: 4.0},
    {city:'South Miami', value: 5.0},
    {city:'Paoli', value: 3.5},
    {city:'Marietta', value: 4.83},
    {city:'Fairfax', value: 5.0},
    {city:'Tampa', value: 4.5},
    {city:'Stockbridge', value: 4.0},
    {city:'Greenbrae', value: 5.0},
    {city:'Chula Vista', value: 5.0},
    {city:'Brandon', value: 3.75},
    {city:'Omaha', value: 4.21},
    {city:'San Antonio', value: 4.63},
    {city:'Philadelphia', value: 4.25},
    {city:'Mansfield', value: 4.0},
    {city:'Dickson', value: 3.5},
    {city:'Daly City', value: 5.0},
    {city:'Crofton', value: 4.5},
    {city:'Farmington Hills', value: 3.5},
    {city:'Durham', value: 4.0},
    {city:'Wendell', value: 4.0},
    {city:'North Las Vegas', value: 4.0},
    {city:'Norfolk', value: 4.5},
    {city:'Round Rock', value: 4.75},
    {city:'Westerville', value: 4.33},
    {city:'Jeffersonville', value: 4.0},
    {city:'Glendale', value: 5.0},
    {city:'Tulsa', value: 4.0},
    {city:'Hastings', value: 4.0},
    {city:'Aurora', value: 4.0},
    {city:'Cordova', value: 4.0},
    {city:'Bingham Farms', value: 4.25},
    {city:'Edmond', value: 4.5},
    {city:'Mesquite', value: 3.5},
    {city:'San Jose', value: 4.5},
    {city:'Blue Springs', value: 3.5},
    {city:'Towson', value: 4.5},
    {city:'New Orleans', value: 4.5},
    {city:'Greenwood Village', value: 4.5},
    {city:'Brea', value: 4.0},
    {city:'West Bloomfield', value: 3.5},
    {city:'Saint Paul', value: 4.0},
    {city:'Hopkins', value: 4.5},
    {city:'Allen Park', value: 4.5},
    {city:'Oklahoma City', value: 4.1},
    {city:'Cincinnati', value: 4.0},
    {city:'Hillsboro', value: 4.0},
    {city:'Newport Beach', value: 4.5},
    {city:'Dallas', value: 4.67},
    {city:'Bellevue', value: 4.0},
    {city:'Washington', value: 4.5},
    {city:'Plymouth Meeting', value: 4.0},
    {city:'Plano', value: 5.0},
    {city:'Saint Clair Shores', value: 4.25},
    {city:'Grand Prairie', value: 4.5},
    {city:'Bedford', value: 5.0},
    {city:'Santa Clara', value: 5.0},
    {city:'Scottsdale', value: 4.0},
    {city:'Plainfield', value: 3.5},
    {city:'Leawood', value: 5.0},
    {city:'Valparaiso', value: 4.0},
    {city:'Bowling Green', value: 4.5},
    {city:'Azle', value: 5.0},
    {city:'Hinsdale', value: 5.0},
    {city:'Tempe', value: 4.0},
    {city:'Dublin', value: 4.0},
    {city:'Indian Trail', value: 4.0},
    {city:'Kansas City', value: 4.25},
    {city:'Pasadena', value: 5.0},
    {city:'Coral Gables', value: 4.0},
    {city:'Hilliard', value: 4.0},
    {city:'Henderson', value: 4.0},
    {city:'Irving', value: 5.0},
    {city:'Waukesha', value: 4.25},
    {city:'Ottawa', value: 4.0},
    {city:'Minneapolis', value: 4.67},
    {city:'Hoffman Estates', value: 4.0},
    {city:'Covington', value: 4.0},
    {city:'Livonia', value: 3.5},
    {city:'Riverside', value: 4.5},
    {city:'La Mesa', value: 4.5},
    {city:'Orange Park', value: 4.5},
    {city:'Menlo Park', value: 4.5},
    {city:'Severna Park', value: 5.0},
    {city:'Phoenix', value: 5.0},
    {city:'Laurel', value: 3.5},
    {city:'Virginia Beach', value: 4.0},
    {city:'Tiburon', value: 4.0},
    {city:'Sellersburg', value: 5.0},
    {city:'Evansville', value: 3.5},
    {city:'South Portland', value: 5.0},
    {city:'Newport News', value: 3.5},
    {city:'Aventura', value: 4.0},
    {city:'Reynoldsburg', value: 4.5},
    {city:'Warr Acres', value: 4.5},
    {city:'Mesa', value: 5.0},
    {city:'Plantation', value: 4.5},
    {city:'Independence', value: 4.5},
    {city:'Fresno', value: 4.25},
    {city:'Milton', value: 5.0},
    {city:'Sugar Land', value: 4.5},
    {city:'Clinton Township', value: 4.0},
    {city:'Chamblee', value: 5.0},
    {city:'Newton Center', value: 4.5},
    {city:'Fishers', value: 5.0},
    {city:'Cary', value: 3.88},
    {city:'Eastpointe', value: 4.0},
    {city:'Clinton', value: 4.0},
    {city:'Brooklyn', value: 4.0},
    {city:'Indianapolis', value: 4.5},
    {city:'Raleigh', value: 4.75},
    {city:'Annapolis', value: 4.0},
    {city:'Columbus', value: 3.5},
    {city:'Lancaster', value: 4.0},
    {city:'Miramar', value: 5.0},
    {city:'Detroit', value: 5.0},
    {city:'Marrero', value: 4.5},
    {city:'Portland', value: 4.5},
    {city:'San Francisco', value: 4.5},
    {city:'Kenner', value: 3.5},
    {city:'Northville', value: 4.5},
    {city:'Oxon Hill', value: 4.5},
    {city:'Morristown', value: 4.5},
    {city:'Sacramento', value: 5.0},
    {city:'Long Beach', value: 5.0},
    {city:'Olathe', value: 3.5},
    {city:'Carmel', value: 4.0},
    {city:'Ponte Vedra Beach', value: 4.5},
    {city:'Pinole', value: 4.5}
    ];
    this.state = {
      data: data,
    }
  }

  componentDidMount() {
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
        height = 4000 - margin.top - margin.bottom;

    var svg = d3.select("#doctor_avg_graphic").append("svg")
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
        .rangeRound([height, 0])
        .padding(0.1)
        .domain(data.map(function (d) {
            return d.city;
        }));

    //make y axis to show bar names
    var yAxis = d3.axisLeft(y)
        // .scale(y)
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
            return y(d.city);
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
            return y(d.city) + y.bandwidth() / 2 + 4;
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
      <div className="doctor-city-rating">
        <div id="doctor_avg_graphic"></div>
      </div>
    );
  }
}

export default DoctorCityRating;