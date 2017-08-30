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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global d3 */
var svg = d3.select('#lineChart svg');
var margin = { top: 20, right: 40, bottom: 30, left: 50 };
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
  // 2,5 = top 3, 1,2 = single
  var carriers = data.columns.slice(1, 2).map(function (id) {
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

  // var carrierNames = { UA: 'United', }

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
/******/ ]);