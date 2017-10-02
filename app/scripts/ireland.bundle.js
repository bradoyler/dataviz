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


var _markers_linesGeo = __webpack_require__(21);

var _markers_linesGeo2 = _interopRequireDefault(_markers_linesGeo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _d3$select$node$getBo = d3.select('#map').node().getBoundingClientRect(),
    width = _d3$select$node$getBo.width; /* global d3, topojson */


var height = width * 0.6;
var svg = d3.select('#map').append('svg').attr('width', width).attr('height', height);

var image = svg.append('image').attr('xlink:href', 'https://user-images.githubusercontent.com/425966/30931698-5c6b5888-a37a-11e7-980f-791406e2cb37.jpg').attr('width', 2500).attr('height', 2000).attr('x', -612) // left/right
.attr('y', -565) // up/down
.attr('transform', 'scale(' + width / 2000 + ')');

var g = svg.append('g').style('stroke-width', '1.5px').attr('transform', 'scale(' + width / 2000 + ')');

var lat = -9; // left/right
var long = 54.59; // up/down
var proj = d3.geoMercator().center([lat, long]).rotate([0, 0]).scale(7100);

var path = d3.geoPath().projection(proj).pointRadius(8);

d3.queue().defer(d3.json, 'data/ireland/topo.json').await(ready);

function drawGeoJson(svg, features, className) {
  return svg.selectAll('.' + className).data(features).enter().append('path').attr('class', className).attr('data-id', function (d) {
    return d.id;
  }).attr('d', path);
}

window.addEventListener('resize', function () {
  var _d3$select$node$getBo2 = d3.select('#map').node().getBoundingClientRect(),
      width = _d3$select$node$getBo2.width;

  svg.attr('width', width); // .attr('height', width * 0.6)
  image.attr('transform', 'scale(' + width / 2000 + ')');
  g.attr('transform', 'scale(' + width / 2000 + ')');
});

function ready(error, ireland) {
  if (error) throw error;

  g.selectAll('.borders').data(topojson.feature(ireland, ireland.objects.ne_10m_admin_0_sovereignty).features).enter().append('path').attr('class', 'borders').attr('d', path);

  var lines = _markers_linesGeo2.default.features.filter(function (f) {
    return f.geometry.type === 'LineString';
  });
  var linePath = drawGeoJson(g, lines, 'geoLine');
  var totalLength = linePath.node().getTotalLength();
  linePath.transition().duration(5000).attrTween('stroke-dasharray', function () {
    return d3.interpolateString('0,' + totalLength, totalLength + ',' + totalLength);
  });

  var markers = _markers_linesGeo2.default.features.filter(function (f) {
    return f.geometry.type === 'Point';
  });
  var els = drawGeoJson(g, markers, 'geoPoint');
  els.on('mouseover', function (d, i) {
    els.attr('style', '');
    d3.select('[data-id="' + d.id + '"]').attr('style', 'fill: #000');
    d3.select('#msg').html('Location: ' + d.properties.name);
  });
}

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"Londonderry"},"id":"Londonderry","geometry":{"type":"Point","coordinates":[-7.3203,54.9921]}},{"type":"Feature","properties":{"name":"Mullenan Road"},"id":"Mullenan Rd","geometry":{"type":"Point","coordinates":[-7.39015,54.96788]}},{"type":"Feature","properties":{"name":"88 Innishroosk Road, Currogs, Lisnaskea, BT92 0PS"},"id":"Lisnaskea","geometry":{"type":"Point","coordinates":[-7.4955934,54.2531331]}},{"type":"Feature","properties":{"name":"Staghall, Old School, Drumacon, Belturbet"},"id":"Belturbet","geometry":{"type":"Point","coordinates":[-7.4680225,54.0957871]}},{"type":"Feature","properties":{"name":"Legnabrocky Farms BT92 1EW"},"id":"Legnabrocky Farms","geometry":{"type":"Point","coordinates":[-7.8232173,54.2543531]}},{"type":"Feature","properties":{"name":"Jonesborough Parish Church, BT35 8SG"},"id":"Jonesborough","geometry":{"type":"Point","coordinates":[-6.3587273,54.1637592]}},{"type":"Feature","properties":{"name":"Newry River Memorial"},"id":"Newry River Memorial","geometry":{"type":"Point","coordinates":[-6.3392627,54.1722935]}},{"type":"Feature","properties":{"name":"Warrenpoint, BT34 3NB"},"id":"Warrenpoint","geometry":{"type":"Point","coordinates":[-6.256386,54.0999246]}},{"type":"Feature","id":"Newtownbutler","properties":{"name":"15 Galloon Road Derrydoon, Newtownbutler, BT92 8HN"},"geometry":{"type":"Point","coordinates":[-8.249196,54.3227898]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-7.320499420166016,54.99228985002795],[-7.334403991699219,54.987759521586526],[-7.348480224609374,54.98549416559231],[-7.36307144165039,54.975544784454684],[-7.375602722167968,54.97712108840263],[-7.3901939392089835,54.968155034807836],[-7.4919891357421875,54.92201227565568],[-7.465209960937499,54.866333938349605],[-7.5002288818359375,54.84815271989618],[-7.483749389648437,54.83114982073622],[-7.4102783203125,54.718275018302315],[-7.495422363281249,54.60866430797486],[-7.48443603515625,54.54657953840501],[-7.45147705078125,54.51470449573694],[-7.46795654296875,54.457266680933856],[-7.63275146484375,54.38535590680546],[-7.610778808593751,54.33734527614333],[-7.57232666015625,54.316523240258256],[-7.4981689453125,54.26361995010228],[-7.450103759765625,54.25479612755466],[-7.450790405273437,54.23513628109273],[-7.497482299804687,54.19819860290669],[-7.5263214111328125,54.15358850331774],[-7.464523315429687,54.09644955669078],[-7.581939697265625,54.20382168527194],[-7.69866943359375,54.25559837127025],[-7.704162597656249,54.270036089610755],[-7.766647338867188,54.25880719007081],[-7.808532714843749,54.270838036831144],[-7.822265625000001,54.2529910221332],[-7.724761962890626,54.21466404047702],[-7.598419189453125,54.20984556727275],[-7.522888183593749,54.189762544552885],[-7.439117431640624,54.23955053156177],[-7.400665283203125,54.2162700733],[-7.285308837890626,54.22911608763996],[-6.7291259765625,54.234734962180816],[-6.700286865234375,54.24877880222132],[-6.606903076171875,54.21024712817615],[-6.5732574462890625,54.190566052866075],[-6.508712768554687,54.17328718204277],[-6.4867401123046875,54.18293209328758],[-6.420135498046875,54.17489482345622],[-6.38031005859375,54.187351925903],[-6.3590240478515625,54.16484603944897],[-6.339111328124999,54.17891365362512],[-6.2903594970703125,54.11416300731598],[-6.255340576171874,54.10047600536083]]}}]}

/***/ })

/******/ });