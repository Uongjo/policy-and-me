import React, { Component } from 'react';
import * as d3 from 'd3';

const TEST_DATA = 
[{"location":"location one","day":1,"hour":1,"value":1},
{"location":"location one","day":1,"hour":2,"value":9},
{"location":"location one","day":1,"hour":3,"value":4},
{"location":"location one","day":1,"hour":4,"value":5},
{"location":"location one","day":1,"hour":5,"value":2},
{"location":"location one","day":1,"hour":6,"value":1},
{"location":"location one","day":1,"hour":7,"value":5},
{"location":"location one","day":1,"hour":8,"value":6},
{"location":"location one","day":1,"hour":9,"value":1},
{"location":"location one","day":1,"hour":10,"value":4},
{"location":"location one","day":1,"hour":11,"value":5},
{"location":"location one","day":1,"hour":12,"value":6},
{"location":"location one","day":1,"hour":13,"value":9},
{"location":"location one","day":1,"hour":14,"value":3},
{"location":"location one","day":1,"hour":15,"value":8},
{"location":"location one","day":1,"hour":16,"value":4},
{"location":"location one","day":1,"hour":17,"value":2},
{"location":"location one","day":1,"hour":18,"value":1},
{"location":"location one","day":1,"hour":19,"value":5},
{"location":"location one","day":1,"hour":20,"value":6},
{"location":"location one","day":1,"hour":21,"value":7},
{"location":"location one","day":1,"hour":22,"value":9},
{"location":"location one","day":1,"hour":23,"value":5},
{"location":"location one","day":1,"hour":24,"value":2},
{"location":"location one","day":2,"hour":1,"value":5},
{"location":"location one","day":2,"hour":2,"value":8},
{"location":"location one","day":2,"hour":3,"value":2},
{"location":"location one","day":2,"hour":4,"value":5},
{"location":"location one","day":2,"hour":5,"value":6},
{"location":"location one","day":2,"hour":6,"value":2},
{"location":"location one","day":2,"hour":7,"value":1},
{"location":"location one","day":2,"hour":8,"value":1},
{"location":"location one","day":2,"hour":9,"value":6},
{"location":"location one","day":2,"hour":10,"value":5},
{"location":"location one","day":2,"hour":11,"value":6},
{"location":"location one","day":2,"hour":12,"value":8},
{"location":"location one","day":2,"hour":13,"value":1},
{"location":"location one","day":2,"hour":14,"value":1},
{"location":"location one","day":2,"hour":15,"value":9},
{"location":"location one","day":2,"hour":16,"value":8},
{"location":"location one","day":2,"hour":17,"value":1},
{"location":"location one","day":2,"hour":18,"value":5},
{"location":"location one","day":2,"hour":19,"value":10},
{"location":"location one","day":2,"hour":20,"value":5},
{"location":"location one","day":2,"hour":21,"value":7},
{"location":"location one","day":2,"hour":22,"value":9},
{"location":"location one","day":2,"hour":23,"value":8},
{"location":"location one","day":2,"hour":24,"value":10},
{"location":"location one","day":3,"hour":1,"value":8},
{"location":"location one","day":3,"hour":2,"value":7},
{"location":"location one","day":3,"hour":3,"value":4},
{"location":"location one","day":3,"hour":4,"value":6},
{"location":"location one","day":3,"hour":5,"value":9},
{"location":"location one","day":3,"hour":6,"value":7},
{"location":"location one","day":3,"hour":7,"value":8},
{"location":"location one","day":3,"hour":8,"value":2},
{"location":"location one","day":3,"hour":9,"value":6},
{"location":"location one","day":3,"hour":10,"value":8},
{"location":"location one","day":3,"hour":11,"value":6},
{"location":"location one","day":3,"hour":12,"value":6},
{"location":"location one","day":3,"hour":13,"value":5},
{"location":"location one","day":3,"hour":14,"value":4},
{"location":"location one","day":3,"hour":15,"value":3},
{"location":"location one","day":3,"hour":16,"value":6},
{"location":"location one","day":3,"hour":17,"value":3},
{"location":"location one","day":3,"hour":18,"value":8},
{"location":"location one","day":3,"hour":19,"value":9},
{"location":"location one","day":3,"hour":20,"value":8},
{"location":"location one","day":3,"hour":21,"value":3},
{"location":"location one","day":3,"hour":22,"value":7},
{"location":"location one","day":3,"hour":23,"value":9},
{"location":"location one","day":3,"hour":24,"value":4},
{"location":"location one","day":4,"hour":1,"value":5},
{"location":"location one","day":4,"hour":2,"value":9},
{"location":"location one","day":4,"hour":3,"value":7},
{"location":"location one","day":4,"hour":4,"value":6},
{"location":"location one","day":4,"hour":5,"value":9},
{"location":"location one","day":4,"hour":6,"value":5},
{"location":"location one","day":4,"hour":7,"value":6},
{"location":"location one","day":4,"hour":8,"value":5},
{"location":"location one","day":4,"hour":9,"value":2},
{"location":"location one","day":4,"hour":10,"value":9},
{"location":"location one","day":4,"hour":11,"value":5},
{"location":"location one","day":4,"hour":12,"value":1},
{"location":"location one","day":4,"hour":13,"value":4},
{"location":"location one","day":4,"hour":14,"value":8},
{"location":"location one","day":4,"hour":15,"value":6},
{"location":"location one","day":4,"hour":16,"value":2},
{"location":"location one","day":4,"hour":17,"value":9},
{"location":"location one","day":4,"hour":18,"value":5},
{"location":"location one","day":4,"hour":19,"value":3},
{"location":"location one","day":4,"hour":20,"value":6},
{"location":"location one","day":4,"hour":21,"value":9},
{"location":"location one","day":4,"hour":22,"value":1},
{"location":"location one","day":4,"hour":23,"value":8},
{"location":"location one","day":4,"hour":24,"value":4},
{"location":"location one","day":5,"hour":1,"value":8},
{"location":"location one","day":5,"hour":2,"value":9},
{"location":"location one","day":5,"hour":3,"value":7},
{"location":"location one","day":5,"hour":4,"value":4},
{"location":"location one","day":5,"hour":5,"value":10},
{"location":"location one","day":5,"hour":6,"value":1},
{"location":"location one","day":5,"hour":7,"value":7},
{"location":"location one","day":5,"hour":8,"value":3},
{"location":"location one","day":5,"hour":9,"value":8},
{"location":"location one","day":5,"hour":10,"value":2},
{"location":"location one","day":5,"hour":11,"value":5},
{"location":"location one","day":5,"hour":12,"value":2},
{"location":"location one","day":5,"hour":13,"value":3},
{"location":"location one","day":5,"hour":14,"value":3},
{"location":"location one","day":5,"hour":15,"value":3},
{"location":"location one","day":5,"hour":16,"value":5},
{"location":"location one","day":5,"hour":17,"value":4},
{"location":"location one","day":5,"hour":18,"value":3},
{"location":"location one","day":5,"hour":19,"value":2},
{"location":"location one","day":5,"hour":20,"value":9},
{"location":"location one","day":5,"hour":21,"value":9},
{"location":"location one","day":5,"hour":22,"value":2},
{"location":"location one","day":5,"hour":23,"value":2},
{"location":"location one","day":5,"hour":24,"value":6},
{"location":"location one","day":6,"hour":1,"value":9},
{"location":"location one","day":6,"hour":2,"value":1},
{"location":"location one","day":6,"hour":3,"value":5},
{"location":"location one","day":6,"hour":4,"value":4},
{"location":"location one","day":6,"hour":5,"value":10},
{"location":"location one","day":6,"hour":6,"value":5},
{"location":"location one","day":6,"hour":7,"value":1},
{"location":"location one","day":6,"hour":8,"value":4},
{"location":"location one","day":6,"hour":9,"value":4},
{"location":"location one","day":6,"hour":10,"value":5},
{"location":"location one","day":6,"hour":11,"value":1},
{"location":"location one","day":6,"hour":12,"value":6},
{"location":"location one","day":6,"hour":13,"value":7},
{"location":"location one","day":6,"hour":14,"value":3},
{"location":"location one","day":6,"hour":15,"value":9},
{"location":"location one","day":6,"hour":16,"value":8},
{"location":"location one","day":6,"hour":17,"value":3},
{"location":"location one","day":6,"hour":18,"value":8},
{"location":"location one","day":6,"hour":19,"value":10},
{"location":"location one","day":6,"hour":20,"value":5},
{"location":"location one","day":6,"hour":21,"value":6},
{"location":"location one","day":6,"hour":22,"value":9},
{"location":"location one","day":6,"hour":23,"value":2},
{"location":"location one","day":6,"hour":24,"value":7},
{"location":"location one","day":7,"hour":1,"value":1},
{"location":"location one","day":7,"hour":2,"value":1},
{"location":"location one","day":7,"hour":3,"value":3},
{"location":"location one","day":7,"hour":4,"value":8},
{"location":"location one","day":7,"hour":5,"value":3},
{"location":"location one","day":7,"hour":6,"value":9},
{"location":"location one","day":7,"hour":7,"value":5},
{"location":"location one","day":7,"hour":8,"value":7},
{"location":"location one","day":7,"hour":9,"value":10},
{"location":"location one","day":7,"hour":10,"value":8},
{"location":"location one","day":7,"hour":11,"value":3},
{"location":"location one","day":7,"hour":12,"value":6},
{"location":"location one","day":7,"hour":13,"value":7},
{"location":"location one","day":7,"hour":14,"value":6},
{"location":"location one","day":7,"hour":15,"value":3},
{"location":"location one","day":7,"hour":16,"value":10},
{"location":"location one","day":7,"hour":17,"value":1},
{"location":"location one","day":7,"hour":18,"value":4},
{"location":"location one","day":7,"hour":19,"value":2},
{"location":"location one","day":7,"hour":20,"value":1},
{"location":"location one","day":7,"hour":21,"value":2},
{"location":"location one","day":7,"hour":22,"value":2},
{"location":"location one","day":7,"hour":23,"value":9},
{"location":"location one","day":7,"hour":24,"value":5},
{"location":"location two","day":1,"hour":1,"value":5},
{"location":"location two","day":1,"hour":2,"value":10},
{"location":"location two","day":1,"hour":3,"value":4},
{"location":"location two","day":1,"hour":4,"value":2},
{"location":"location two","day":1,"hour":5,"value":1},
{"location":"location two","day":1,"hour":6,"value":7},
{"location":"location two","day":1,"hour":7,"value":10},
{"location":"location two","day":1,"hour":8,"value":9},
{"location":"location two","day":1,"hour":9,"value":3},
{"location":"location two","day":1,"hour":10,"value":8},
{"location":"location two","day":1,"hour":11,"value":10},
{"location":"location two","day":1,"hour":12,"value":9},
{"location":"location two","day":1,"hour":13,"value":5},
{"location":"location two","day":1,"hour":14,"value":3},
{"location":"location two","day":1,"hour":15,"value":3},
{"location":"location two","day":1,"hour":16,"value":9},
{"location":"location two","day":1,"hour":17,"value":1},
{"location":"location two","day":1,"hour":18,"value":10},
{"location":"location two","day":1,"hour":19,"value":2},
{"location":"location two","day":1,"hour":20,"value":10},
{"location":"location two","day":1,"hour":21,"value":6},
{"location":"location two","day":1,"hour":22,"value":9},
{"location":"location two","day":1,"hour":23,"value":2},
{"location":"location two","day":1,"hour":24,"value":10},
{"location":"location two","day":2,"hour":1,"value":9},
{"location":"location two","day":2,"hour":2,"value":7},
{"location":"location two","day":2,"hour":3,"value":4},
{"location":"location two","day":2,"hour":4,"value":3},
{"location":"location two","day":2,"hour":5,"value":6},
{"location":"location two","day":2,"hour":6,"value":4},
{"location":"location two","day":2,"hour":7,"value":9},
{"location":"location two","day":2,"hour":8,"value":8},
{"location":"location two","day":2,"hour":9,"value":4},
{"location":"location two","day":2,"hour":10,"value":10},
{"location":"location two","day":2,"hour":11,"value":3},
{"location":"location two","day":2,"hour":12,"value":1},
{"location":"location two","day":2,"hour":13,"value":3},
{"location":"location two","day":2,"hour":14,"value":2},
{"location":"location two","day":2,"hour":15,"value":10},
{"location":"location two","day":2,"hour":16,"value":1},
{"location":"location two","day":2,"hour":17,"value":9},
{"location":"location two","day":2,"hour":18,"value":9},
{"location":"location two","day":2,"hour":19,"value":9},
{"location":"location two","day":2,"hour":20,"value":3},
{"location":"location two","day":2,"hour":21,"value":9},
{"location":"location two","day":2,"hour":22,"value":10},
{"location":"location two","day":2,"hour":23,"value":4},
{"location":"location two","day":2,"hour":24,"value":2},
{"location":"location two","day":3,"hour":1,"value":3},
{"location":"location two","day":3,"hour":2,"value":1},
{"location":"location two","day":3,"hour":3,"value":5},
{"location":"location two","day":3,"hour":4,"value":6},
{"location":"location two","day":3,"hour":5,"value":7},
{"location":"location two","day":3,"hour":6,"value":2},
{"location":"location two","day":3,"hour":7,"value":9},
{"location":"location two","day":3,"hour":8,"value":7},
{"location":"location two","day":3,"hour":9,"value":9},
{"location":"location two","day":3,"hour":10,"value":5},
{"location":"location two","day":3,"hour":11,"value":2},
{"location":"location two","day":3,"hour":12,"value":10},
{"location":"location two","day":3,"hour":13,"value":9},
{"location":"location two","day":3,"hour":14,"value":10},
{"location":"location two","day":3,"hour":15,"value":2},
{"location":"location two","day":3,"hour":16,"value":3},
{"location":"location two","day":3,"hour":17,"value":2},
{"location":"location two","day":3,"hour":18,"value":3},
{"location":"location two","day":3,"hour":19,"value":10},
{"location":"location two","day":3,"hour":20,"value":8},
{"location":"location two","day":3,"hour":21,"value":6},
{"location":"location two","day":3,"hour":22,"value":7},
{"location":"location two","day":3,"hour":23,"value":8},
{"location":"location two","day":3,"hour":24,"value":2},
{"location":"location two","day":4,"hour":1,"value":9},
{"location":"location two","day":4,"hour":2,"value":1},
{"location":"location two","day":4,"hour":3,"value":10},
{"location":"location two","day":4,"hour":4,"value":9},
{"location":"location two","day":4,"hour":5,"value":3},
{"location":"location two","day":4,"hour":6,"value":8},
{"location":"location two","day":4,"hour":7,"value":5},
{"location":"location two","day":4,"hour":8,"value":7},
{"location":"location two","day":4,"hour":9,"value":6},
{"location":"location two","day":4,"hour":10,"value":7},
{"location":"location two","day":4,"hour":11,"value":6},
{"location":"location two","day":4,"hour":12,"value":5},
{"location":"location two","day":4,"hour":13,"value":5},
{"location":"location two","day":4,"hour":14,"value":10},
{"location":"location two","day":4,"hour":15,"value":10},
{"location":"location two","day":4,"hour":16,"value":1},
{"location":"location two","day":4,"hour":17,"value":9},
{"location":"location two","day":4,"hour":18,"value":2},
{"location":"location two","day":4,"hour":19,"value":8},
{"location":"location two","day":4,"hour":20,"value":4},
{"location":"location two","day":4,"hour":21,"value":8},
{"location":"location two","day":4,"hour":22,"value":3},
{"location":"location two","day":4,"hour":23,"value":2},
{"location":"location two","day":4,"hour":24,"value":5},
{"location":"location two","day":5,"hour":1,"value":4},
{"location":"location two","day":5,"hour":2,"value":2},
{"location":"location two","day":5,"hour":3,"value":6},
{"location":"location two","day":5,"hour":4,"value":5},
{"location":"location two","day":5,"hour":5,"value":5},
{"location":"location two","day":5,"hour":6,"value":7},
{"location":"location two","day":5,"hour":7,"value":9},
{"location":"location two","day":5,"hour":8,"value":4},
{"location":"location two","day":5,"hour":9,"value":10},
{"location":"location two","day":5,"hour":10,"value":4},
{"location":"location two","day":5,"hour":11,"value":10},
{"location":"location two","day":5,"hour":12,"value":2},
{"location":"location two","day":5,"hour":13,"value":9},
{"location":"location two","day":5,"hour":14,"value":7},
{"location":"location two","day":5,"hour":15,"value":5},
{"location":"location two","day":5,"hour":16,"value":4},
{"location":"location two","day":5,"hour":17,"value":6},
{"location":"location two","day":5,"hour":18,"value":1},
{"location":"location two","day":5,"hour":19,"value":2},
{"location":"location two","day":5,"hour":20,"value":8},
{"location":"location two","day":5,"hour":21,"value":3},
{"location":"location two","day":5,"hour":22,"value":6},
{"location":"location two","day":5,"hour":23,"value":5},
{"location":"location two","day":5,"hour":24,"value":3},
{"location":"location two","day":6,"hour":1,"value":2},
{"location":"location two","day":6,"hour":2,"value":9},
{"location":"location two","day":6,"hour":3,"value":7},
{"location":"location two","day":6,"hour":4,"value":6},
{"location":"location two","day":6,"hour":5,"value":10},
{"location":"location two","day":6,"hour":6,"value":10},
{"location":"location two","day":6,"hour":7,"value":2},
{"location":"location two","day":6,"hour":8,"value":10},
{"location":"location two","day":6,"hour":9,"value":7},
{"location":"location two","day":6,"hour":10,"value":3},
{"location":"location two","day":6,"hour":11,"value":6},
{"location":"location two","day":6,"hour":12,"value":7},
{"location":"location two","day":6,"hour":13,"value":2},
{"location":"location two","day":6,"hour":14,"value":1},
{"location":"location two","day":6,"hour":15,"value":7},
{"location":"location two","day":6,"hour":16,"value":3},
{"location":"location two","day":6,"hour":17,"value":6},
{"location":"location two","day":6,"hour":18,"value":8},
{"location":"location two","day":6,"hour":19,"value":2},
{"location":"location two","day":6,"hour":20,"value":3},
{"location":"location two","day":6,"hour":21,"value":8},
{"location":"location two","day":6,"hour":22,"value":7},
{"location":"location two","day":6,"hour":23,"value":1},
{"location":"location two","day":6,"hour":24,"value":10},
{"location":"location two","day":7,"hour":1,"value":1},
{"location":"location two","day":7,"hour":2,"value":2},
{"location":"location two","day":7,"hour":3,"value":6},
{"location":"location two","day":7,"hour":4,"value":3},
{"location":"location two","day":7,"hour":5,"value":3},
{"location":"location two","day":7,"hour":6,"value":2},
{"location":"location two","day":7,"hour":7,"value":10},
{"location":"location two","day":7,"hour":8,"value":1},
{"location":"location two","day":7,"hour":9,"value":6},
{"location":"location two","day":7,"hour":10,"value":2},
{"location":"location two","day":7,"hour":11,"value":2},
{"location":"location two","day":7,"hour":12,"value":2},
{"location":"location two","day":7,"hour":13,"value":1},
{"location":"location two","day":7,"hour":14,"value":8},
{"location":"location two","day":7,"hour":15,"value":2},
{"location":"location two","day":7,"hour":16,"value":10},
{"location":"location two","day":7,"hour":17,"value":1},
{"location":"location two","day":7,"hour":18,"value":1},
{"location":"location two","day":7,"hour":19,"value":3},
{"location":"location two","day":7,"hour":20,"value":4},
{"location":"location two","day":7,"hour":21,"value":5},
{"location":"location two","day":7,"hour":22,"value":9},
{"location":"location two","day":7,"hour":23,"value":1},
{"location":"location two","day":7,"hour":24,"value":7},
{"location":"location three","day":1,"hour":1,"value":4},
{"location":"location three","day":1,"hour":2,"value":9},
{"location":"location three","day":1,"hour":3,"value":3},
{"location":"location three","day":1,"hour":4,"value":3},
{"location":"location three","day":1,"hour":5,"value":8},
{"location":"location three","day":1,"hour":6,"value":10},
{"location":"location three","day":1,"hour":7,"value":3},
{"location":"location three","day":1,"hour":8,"value":4},
{"location":"location three","day":1,"hour":9,"value":6},
{"location":"location three","day":1,"hour":10,"value":7},
{"location":"location three","day":1,"hour":11,"value":6},
{"location":"location three","day":1,"hour":12,"value":3},
{"location":"location three","day":1,"hour":13,"value":3},
{"location":"location three","day":1,"hour":14,"value":6},
{"location":"location three","day":1,"hour":15,"value":9},
{"location":"location three","day":1,"hour":16,"value":6},
{"location":"location three","day":1,"hour":17,"value":6},
{"location":"location three","day":1,"hour":18,"value":8},
{"location":"location three","day":1,"hour":19,"value":3},
{"location":"location three","day":1,"hour":20,"value":3},
{"location":"location three","day":1,"hour":21,"value":3},
{"location":"location three","day":1,"hour":22,"value":1},
{"location":"location three","day":1,"hour":23,"value":1},
{"location":"location three","day":1,"hour":24,"value":7},
{"location":"location three","day":2,"hour":1,"value":3},
{"location":"location three","day":2,"hour":2,"value":4},
{"location":"location three","day":2,"hour":3,"value":5},
{"location":"location three","day":2,"hour":4,"value":4},
{"location":"location three","day":2,"hour":5,"value":6},
{"location":"location three","day":2,"hour":6,"value":3},
{"location":"location three","day":2,"hour":7,"value":10},
{"location":"location three","day":2,"hour":8,"value":7},
{"location":"location three","day":2,"hour":9,"value":2},
{"location":"location three","day":2,"hour":10,"value":9},
{"location":"location three","day":2,"hour":11,"value":1},
{"location":"location three","day":2,"hour":12,"value":8},
{"location":"location three","day":2,"hour":13,"value":6},
{"location":"location three","day":2,"hour":14,"value":6},
{"location":"location three","day":2,"hour":15,"value":4},
{"location":"location three","day":2,"hour":16,"value":2},
{"location":"location three","day":2,"hour":17,"value":5},
{"location":"location three","day":2,"hour":18,"value":5},
{"location":"location three","day":2,"hour":19,"value":10},
{"location":"location three","day":2,"hour":20,"value":2},
{"location":"location three","day":2,"hour":21,"value":4},
{"location":"location three","day":2,"hour":22,"value":4},
{"location":"location three","day":2,"hour":23,"value":1},
{"location":"location three","day":2,"hour":24,"value":8},
{"location":"location three","day":3,"hour":1,"value":5},
{"location":"location three","day":3,"hour":2,"value":10},
{"location":"location three","day":3,"hour":3,"value":4},
{"location":"location three","day":3,"hour":4,"value":10},
{"location":"location three","day":3,"hour":5,"value":2},
{"location":"location three","day":3,"hour":6,"value":9},
{"location":"location three","day":3,"hour":7,"value":1},
{"location":"location three","day":3,"hour":8,"value":1},
{"location":"location three","day":3,"hour":9,"value":7},
{"location":"location three","day":3,"hour":10,"value":8},
{"location":"location three","day":3,"hour":11,"value":4},
{"location":"location three","day":3,"hour":12,"value":2},
{"location":"location three","day":3,"hour":13,"value":7},
{"location":"location three","day":3,"hour":14,"value":9},
{"location":"location three","day":3,"hour":15,"value":5},
{"location":"location three","day":3,"hour":16,"value":4},
{"location":"location three","day":3,"hour":17,"value":7},
{"location":"location three","day":3,"hour":18,"value":4},
{"location":"location three","day":3,"hour":19,"value":3},
{"location":"location three","day":3,"hour":20,"value":5},
{"location":"location three","day":3,"hour":21,"value":5},
{"location":"location three","day":3,"hour":22,"value":2},
{"location":"location three","day":3,"hour":23,"value":10},
{"location":"location three","day":3,"hour":24,"value":7},
{"location":"location three","day":4,"hour":1,"value":9},
{"location":"location three","day":4,"hour":2,"value":10},
{"location":"location three","day":4,"hour":3,"value":10},
{"location":"location three","day":4,"hour":4,"value":8},
{"location":"location three","day":4,"hour":5,"value":7},
{"location":"location three","day":4,"hour":6,"value":1},
{"location":"location three","day":4,"hour":7,"value":10},
{"location":"location three","day":4,"hour":8,"value":1},
{"location":"location three","day":4,"hour":9,"value":6},
{"location":"location three","day":4,"hour":10,"value":3},
{"location":"location three","day":4,"hour":11,"value":6},
{"location":"location three","day":4,"hour":12,"value":2},
{"location":"location three","day":4,"hour":13,"value":10},
{"location":"location three","day":4,"hour":14,"value":4},
{"location":"location three","day":4,"hour":15,"value":7},
{"location":"location three","day":4,"hour":16,"value":2},
{"location":"location three","day":4,"hour":17,"value":10},
{"location":"location three","day":4,"hour":18,"value":1},
{"location":"location three","day":4,"hour":19,"value":2},
{"location":"location three","day":4,"hour":20,"value":1},
{"location":"location three","day":4,"hour":21,"value":2},
{"location":"location three","day":4,"hour":22,"value":9},
{"location":"location three","day":4,"hour":23,"value":8},
{"location":"location three","day":4,"hour":24,"value":7},
{"location":"location three","day":5,"hour":1,"value":1},
{"location":"location three","day":5,"hour":2,"value":7},
{"location":"location three","day":5,"hour":3,"value":1},
{"location":"location three","day":5,"hour":4,"value":3},
{"location":"location three","day":5,"hour":5,"value":8},
{"location":"location three","day":5,"hour":6,"value":9},
{"location":"location three","day":5,"hour":7,"value":1},
{"location":"location three","day":5,"hour":8,"value":1},
{"location":"location three","day":5,"hour":9,"value":2},
{"location":"location three","day":5,"hour":10,"value":8},
{"location":"location three","day":5,"hour":11,"value":1},
{"location":"location three","day":5,"hour":12,"value":5},
{"location":"location three","day":5,"hour":13,"value":10},
{"location":"location three","day":5,"hour":14,"value":9},
{"location":"location three","day":5,"hour":15,"value":7},
{"location":"location three","day":5,"hour":16,"value":6},
{"location":"location three","day":5,"hour":17,"value":3},
{"location":"location three","day":5,"hour":18,"value":2},
{"location":"location three","day":5,"hour":19,"value":7},
{"location":"location three","day":5,"hour":20,"value":2},
{"location":"location three","day":5,"hour":21,"value":3},
{"location":"location three","day":5,"hour":22,"value":7},
{"location":"location three","day":5,"hour":23,"value":9},
{"location":"location three","day":5,"hour":24,"value":6},
{"location":"location three","day":6,"hour":1,"value":10},
{"location":"location three","day":6,"hour":2,"value":9},
{"location":"location three","day":6,"hour":3,"value":4},
{"location":"location three","day":6,"hour":4,"value":9},
{"location":"location three","day":6,"hour":5,"value":1},
{"location":"location three","day":6,"hour":6,"value":3},
{"location":"location three","day":6,"hour":7,"value":7},
{"location":"location three","day":6,"hour":8,"value":2},
{"location":"location three","day":6,"hour":9,"value":4},
{"location":"location three","day":6,"hour":10,"value":7},
{"location":"location three","day":6,"hour":11,"value":8},
{"location":"location three","day":6,"hour":12,"value":6},
{"location":"location three","day":6,"hour":13,"value":3},
{"location":"location three","day":6,"hour":14,"value":4},
{"location":"location three","day":6,"hour":15,"value":10},
{"location":"location three","day":6,"hour":16,"value":9},
{"location":"location three","day":6,"hour":17,"value":8},
{"location":"location three","day":6,"hour":18,"value":10},
{"location":"location three","day":6,"hour":19,"value":8},
{"location":"location three","day":6,"hour":20,"value":4},
{"location":"location three","day":6,"hour":21,"value":2},
{"location":"location three","day":6,"hour":22,"value":9},
{"location":"location three","day":6,"hour":23,"value":4},
{"location":"location three","day":6,"hour":24,"value":9},
{"location":"location three","day":7,"hour":1,"value":2},
{"location":"location three","day":7,"hour":2,"value":8},
{"location":"location three","day":7,"hour":3,"value":8},
{"location":"location three","day":7,"hour":4,"value":6},
{"location":"location three","day":7,"hour":5,"value":3},
{"location":"location three","day":7,"hour":6,"value":5},
{"location":"location three","day":7,"hour":7,"value":6},
{"location":"location three","day":7,"hour":8,"value":4},
{"location":"location three","day":7,"hour":9,"value":2},
{"location":"location three","day":7,"hour":10,"value":3},
{"location":"location three","day":7,"hour":11,"value":9},
{"location":"location three","day":7,"hour":12,"value":4},
{"location":"location three","day":7,"hour":13,"value":6},
{"location":"location three","day":7,"hour":14,"value":6},
{"location":"location three","day":7,"hour":15,"value":4},
{"location":"location three","day":7,"hour":16,"value":2},
{"location":"location three","day":7,"hour":17,"value":2},
{"location":"location three","day":7,"hour":18,"value":3},
{"location":"location three","day":7,"hour":19,"value":10},
{"location":"location three","day":7,"hour":20,"value":3},
{"location":"location three","day":7,"hour":21,"value":8},
{"location":"location three","day":7,"hour":22,"value":1},
{"location":"location three","day":7,"hour":23,"value":2},
{"location":"location three","day":7,"hour":24,"value":6}]


class VisualizationHeatMap extends Component {
  state = {  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    var dataset;
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    times = d3.range(24);
    
    var margin = {top:40, right:50, bottom:70, left:50};
    
    // calculate width and height based on window size
    var w = Math.max(Math.min(window.innerWidth, 1000), 500) - margin.left - margin.right - 20,
    gridSize = Math.floor(w / times.length),
    h = gridSize * (days.length+2);

    //reset the overall font size
    var newFontSize = w * 62.5 / 900;
    d3.select(".visualization-heat-map").style("font-size", newFontSize + "%");
    
    // svg container
    var svg = d3.select("#heatmap")
      .append("svg")
      .attr("width", w + margin.top + margin.bottom)
      .attr("height", h + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // linear colour scale
    var colours = d3.scaleLinear()
      .domain(d3.range(1, 11, 1))
      .range(["#87cefa", "#86c6ef", "#85bde4", "#83b7d9", "#82afce", "#80a6c2", "#7e9fb8", "#7995aa", "#758b9e", "#708090"]);
    
    var dayLabels = svg.selectAll(".dayLabel")
      .data(days)
      .enter()
      .append("text")
      .text(function(d) { return d; })
      .attr("x", 0)
      .attr("y", function(d, i) { return i * gridSize; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + gridSize / 1.5 + ")")

    var timeLabels = svg.selectAll(".timeLabel")
      .data(times)
      .enter()
      .append("text")
      .text(function(d) { return d; })
      .attr("x", function(d, i) { return i * gridSize; })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)");

    // load data

    function drawData(data) {

      console.log("TEST_DATA");
      data.forEach(function(d) {
          d.day = +d.day;
          d.hour = +d.hour;
          d.value = +d.value;
      });
      dataset = data;

      // group data by location
      var nest = d3.nest()
        .key(function(d) { return d.location; })
        .entries(dataset);

      // array of locations in the data
      var locations = nest.map(function(d) { return d.key; });
      var currentLocationIndex = 0;

      // create location dropdown menu
      var locationMenu = d3.select("#locationDropdown");
      locationMenu
        .append("select")
        .attr("id", "locationMenu")
        .selectAll("option")
          .data(locations)
          .enter()
          .append("option")
          .attr("value", function(d, i) { return i; })
          .text(function(d) { return d; });

      // function to create the initial heatmap
      var drawHeatmap = function(location) {

        // filter the data to return object of location of interest
        var selectLocation = nest.find(function(d) {
          return d.key == location;
        });

        var heatmap = svg.selectAll(".hour")
          .data(selectLocation.values)
          .enter()
          .append("rect")
          .attr("x", function(d) { return (d.hour-1) * gridSize; })
          .attr("y", function(d) { return (d.day-1) * gridSize; })
          .attr("class", "hour bordered")
          .attr("width", gridSize)
          .attr("height", gridSize)
          .style("stroke", "white")
          .style("stroke-opacity", 0.6)
          .style("fill", function(d) { return colours(d.value); })
        }
      drawHeatmap(locations[currentLocationIndex]);

      var updateHeatmap = function(location) {
        console.log("currentLocationIndex: " + currentLocationIndex)
        // filter data to return object of location of interest
        var selectLocation = nest.find(function(d) {
          return d.key == location;
        });

        // update the data and redraw heatmap
        var heatmap = svg.selectAll(".hour")
          .data(selectLocation.values)
          .transition()
            .duration(500)
            .style("fill", function(d) { return colours(d.value); })
      }

      // run update function when dropdown selection changes
      locationMenu.on("change", function() {
        // find which location was selected from the dropdown
        var selectedLocation = d3.select(this)
          .select("select")
          .property("value");
        currentLocationIndex = +selectedLocation;
        // run update function with selected location
        updateHeatmap(locations[currentLocationIndex]);
      });   

      d3.selectAll(".nav").on("click", function() {
        if(d3.select(this).classed("left")) {
          if(currentLocationIndex == 0) {
            currentLocationIndex = locations.length-1;
          } else {
            currentLocationIndex--;  
          }
        } else if(d3.select(this).classed("right")) {
          if(currentLocationIndex == locations.length-1) {
            currentLocationIndex = 0;
          } else {
            currentLocationIndex++;  
          }
        }
        d3.select("#locationMenu").property("value", currentLocationIndex)
        updateHeatmap(locations[currentLocationIndex]);
      })
    }
    drawData(TEST_DATA);
  }

  render() { 
    return (
      <div className="visualization-heat-map">
        <div id="nav-container">
          <div className="nav left">left</div>
          <div id="locationDropdown"></div>
          <div className="nav right">right</div>
        </div>
        <div id="heatmap"></div>
      </div>
    );
  }
}
 
export default VisualizationHeatMap;