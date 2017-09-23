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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global d3, topojson */

var locationIndex = 0;

var locations = [{ name: 'Londonderry, UK', lat: 54.9966120, long: -7.3085750 }, { name: 'The Peace Bridge, Derry BT48 7NN, UK', lat: 54.9979, long: -7.3159400 }, { name: 'Mullenan Rd, Londonderry BT48 9XW, UK', lat: 54.96788, long: -7.39015 }, { name: 'Fermanagh, United Kingdom', lat: 54.34383, long: -7.63187 }, { name: 'Sheridan John, DP1, Enniskillen BT92 1ED, UK', lat: 54.28067, long: -7.82704 }, { name: 'Ballindarragh, Enniskillen BT94 5NZ, UK', lat: 54.2705, long: -7.50278 }, { name: 'Newtownbutler, Enniskillen, UK', lat: 54.18207, long: -7.36064 }, { name: 'Belturbet, Kilconny, Co. Cavan, Ireland', lat: 54.10191, long: -7.44967 }];

var svg = d3.select('#map').append('svg').attr('width', '100%');

var _d3$select$node$getBo = d3.select('#map').node().getBoundingClientRect(),
    width = _d3$select$node$getBo.width;

var height = width * 0.68;

svg.attr('height', height);

var proj = d3.geoAlbers().center([locations[0].long, locations[0].lat]).rotate([0, 0]).scale(35000).translate([width / 2, height / 2]);

var path = d3.geoPath().projection(proj); // .pointRadius(2.5)

d3.queue().defer(d3.json, 'data/ireland/topo.json').await(ready);

function ready(error, ireland) {
  if (error) throw error;

  var g = svg.append('g').style('stroke-width', '1.5px');

  g.selectAll('.borders').data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features).enter().append('path').attr('class', 'borders').attr('d', path);

  drawMapPoints(g, proj, locations);
  setInterval(function () {
    if (locationIndex > locations.length - 1) {
      locationIndex = 0;
    }
    centerMap(g, proj, locations[locationIndex]);
    d3.select('#location').text(locations[locationIndex].name);
    d3.select("[data-name='" + locations[locationIndex].name + "']").style('fill', 'blue').style('stroke', 'white');
    locationIndex += 1;
  }, 3000);
}

function drawMapPoints(svg, projection, coords) {
  var circleGroup = svg.selectAll('circle').data(coords).enter().append('g').attr('data-name', function (d) {
    return d.name;
  }).attr('transform', function (d) {
    return 'translate(' + projection([d.long, d.lat]) + ')';
  }).attr('class', 'points');

  circleGroup.append('circle')
  // .style('fill-opacity', .8)
  .attr('r', function (d) {
    return 2;
  })
  // .on('mouseover', tip.show)
  // .on('mouseout', tip.hide)
  .append('title').text(function (d) {
    return d.name;
  });
}

function centerMap(g, projection, location) {
  var originXY = projection([locations[0].long, locations[0].lat]);
  var XY = projection([location.long, location.lat]);
  var dx = originXY[0] - XY[0];
  var dy = originXY[1] - XY[1];
  var xy = [dx, dy];
  console.log('>>>', location);
  g.transition().duration(1500).attr('transform', 'translate(' + xy + ')');
}

/***/ })

/******/ });