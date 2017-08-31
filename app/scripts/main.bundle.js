/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global d3, topojson */
// import * as topojson from 'topojson-client'

var svg = d3.select('#us-map svg');
var width = 960; // +svg.attr('width')
var height = 600; // +svg.attr('height')

var projection = d3.geoAlbers().translate([width / 2, height / 2]).scale(1280);

// var radius = d3.scaleSqrt()
//     .domain([0, 100])
//     .range([0, 14])

var path = d3.geoPath().projection(projection).pointRadius(2.5);

var voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);

d3.queue().defer(d3.json, 'data/us.json').defer(d3.csv, 'data/airports.csv', typeAirport).defer(d3.csv, 'data/flights.csv', typeFlight).await(ready);

function ready(error, us, airports, flights) {
    // console.log(error, us);
    if (error) throw error;

    var airportByIata = d3.map(airports, function (d) {
        return d.iata;
    });

    flights.forEach(function (flight) {
        var source = airportByIata.get(flight.origin);
        var target = airportByIata.get(flight.destination);
        source.arcs.coordinates.push([source, target]);
        target.arcs.coordinates.push([target, source]);
    });

    airports = airports.filter(function (d) {
        return d.arcs.coordinates.length;
    });

    svg.append('path').datum(topojson.feature(us, us.objects.land)).attr('class', 'land').attr('d', path);

    svg.append('path').datum(topojson.mesh(us, us.objects.states, function (a, b) {
        return a !== b;
    })).attr('class', 'state-borders').attr('d', path);

    svg.append('path').datum({ type: 'MultiPoint', coordinates: airports }).attr('class', 'airport-dots').attr('d', path);

    var airport = svg.selectAll('.airport').data(airports).enter().append('g').attr('class', 'airport');

    airport.append('title').text(function (d) {
        return d.iata + '\n' + d.arcs.coordinates.length + ' flights';
    });

    airport.append('path').attr('class', 'airport-arc').attr('d', function (d) {
        return path(d.arcs);
    });

    airport.append('path').data(voronoi.polygons(airports.map(projection))).attr('class', 'airport-cell').attr('d', function (d) {
        return d ? 'M' + d.join('L') + 'Z' : null;
    });
}

function typeAirport(d) {
    d[0] = +d.longitude;
    d[1] = +d.latitude;
    d.arcs = { type: 'MultiLineString', coordinates: [] };
    return d;
}

function typeFlight(d) {
    d.count = +d.count;
    return d;
}

// https://bl.ocks.org/mbostock/7608400/e5974d9bba45bc9ab272d98dd7427567aafd55bc

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global bb */

bb.generate({
  bindto: '#bbchart1',
  data: {
    columns: [['data1', 30, 200, 100, 170, 150, 250], ['data2', 130, 100, 140, 35, 110, 50]],
    types: {
      data1: 'line',
      data2: 'area-spline'
    },
    colors: {
      data1: 'red',
      data2: 'green'
    }
  }
});

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(18);

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global d3 */

var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 60
};

var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select('#barchart svg').attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var x = d3.scaleLinear().range([0, width]);

var y = d3.scaleBand().range([height, 0]);

var xAxis = d3.axisBottom(x).ticks(6).tickFormat(function (d) {
  if (d >= 1000 && d < 1000000) {
    d = d / 1000 + 'K';
  }
  if (d >= 1000000) {
    d = d / 1000000 + 'M';
  }
  return d;
}).tickSizeInner([height]);
var yAxis = d3.axisLeft(y);

d3.csv('data/carriers.csv', type, function (error, data) {
  if (error) throw error;

  data.sort(function (a, b) {
    return a.flights - b.flights;
  });
  var minVal = d3.min(data, function (d) {
    return d.flights;
  });
  var min = minVal - minVal * 0.1;
  var max = d3.max(data, function (d) {
    return d.flights;
  });
  x.domain([min, max]);
  y.domain(data.map(function (d) {
    return d.carrier;
  })).paddingInner(0.2);

  svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + -2 + ')').call(xAxis);

  svg.append('g').attr('class', 'y axis').call(yAxis);

  svg.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar').attr('x', 0).attr('height', y.bandwidth()).attr('y', function (d) {
    return y(d.carrier);
  }).attr('width', function (d) {
    return x(d.flights);
  });
});

function type(d) {
  d.flights = +d.flights;
  return d;
}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global d3 */
var svg = d3.select('#linechart svg');
var margin = { top: 20, right: 60, bottom: 30, left: 50 };
var width = svg.node().clientWidth - margin.left - margin.right;
var outerHeight = width * 0.67;
svg.attr('height', outerHeight);
var height = outerHeight - margin.top - margin.bottom;

var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);
var z = d3.scaleOrdinal(d3.schemeCategory20);

var line = d3.line().curve(d3.curveNatural).x(function (d) {
  return x(d.date);
}).y(function (d) {
  return y(d.ppf);
});

d3.csv('data/fpp.csv', type, ready);

function type(d, _, columns) {
  d.date = d3.timeParse('%Y')(d.date);
  for (var i = 1, n = columns.length, c; i < n; ++i) {
    d[c = columns[i]] = +d[c];
  }return d;
}

function ready(error, data) {
  if (error) throw error;
  // 2,6 = top 4, 1,2 = single
  var carriers = data.columns.slice(2, 6).map(function (id) {
    return {
      id: id,
      values: data.map(function (d) {
        return { date: d.date, ppf: d[id] };
      })
    };
  });

  x.domain(d3.extent(data, function (d) {
    return d.date;
  }));

  y.domain([d3.min(carriers, function (c) {
    return d3.min(c.values, function (d) {
      return d.ppf;
    });
  }), d3.max(carriers, function (c) {
    return d3.max(c.values, function (d) {
      return d.ppf;
    });
  })]);

  z.domain(carriers.map(function (c) {
    return c.id;
  }));

  g.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));

  g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y)).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '0.71em').attr('fill', '#000').text('Passengers Per Flight');

  var carrier = g.selectAll('.carrier').data(carriers).enter().append('g').attr('class', 'carrier');

  carrier.append('path').attr('class', 'line').attr('d', function (d) {
    return line(d.values);
  }).style('stroke', function (d) {
    return z(d.id);
  });

  carrier.append('text').datum(function (d) {
    return { id: d.id, value: d.values[d.values.length - 1] };
  }).attr('transform', function (d) {
    return 'translate(' + x(d.value.date) + ',' + y(d.value.ppf) + ')';
  }).attr('x', 3).attr('dy', '0.35em').style('font', '10px sans-serif').text(function (d) {
    return d.id;
  });
}

// $(window).resize(render)

/***/ })

/******/ });