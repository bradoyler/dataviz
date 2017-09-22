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
var coords = [{ name: 'a', long: -7.5, lat: 55 }, { name: 'b', long: -7.49, lat: 54.9 }, { name: 'c', long: -7.48, lat: 54.7 }, { name: 'd', long: -7.47, lat: 54.5 }, { name: 'e', long: -7.46, lat: 54.45 }, { name: 'f', long: -7.45, lat: 54.44 }];

var svg = d3.select('#map').append('svg').attr('width', '100%');

var _d3$select$node$getBo = d3.select('#map').node().getBoundingClientRect(),
    width = _d3$select$node$getBo.width;

var height = width * 0.72; // aspect

svg.attr('height', height);

var proj = d3.geoAlbers().center([coords[0].long, coords[0].lat]).rotate([0, 0]).scale(35000).translate([width / 2, height / 2]);

var path = d3.geoPath().projection(proj); // .pointRadius(2.5)

d3.queue().defer(d3.json, 'data/ireland/topo.json').await(ready);

function ready(error, ireland) {
  if (error) throw error;

  var g = svg.append('g').style('stroke-width', '1.5px');

  g.selectAll('.borders').data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features).enter().append('path').attr('class', 'borders').attr('d', path);

  drawMapPoints(g, proj, coords);
  setInterval(function () {
    centerMap(g, proj, [coords[5].long, coords[5].lat]);
  }, 4000);
}

function drawMapPoints(svg, projection, coords) {
  var circleGroup = svg.selectAll('circle').data(coords).enter().append('g').attr('transform', function (d) {
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
var Xpoint = -50;
var Ypoint = -100;
function centerMap(g, projection, latlong) {
  var x = Xpoint -= 1;
  var y = Ypoint -= 100;
  if (y < -900) {
    Xpoint = -50;
    Ypoint = -100;
  }
  var xy = [x, y];
  console.log(xy, '<< new xy');
  g.transition()
  //   .duration(1500)
  //   .attr('transform', `scale(1)`)
  // .transition()
  .duration(1500).attr('transform', 'translate(' + xy + ')');
}

/***/ })

/******/ });